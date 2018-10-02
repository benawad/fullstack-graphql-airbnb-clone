import "reflect-metadata";
// tslint:disable-next-line:no-var-requires
require("dotenv-safe").config();
import { ApolloServer } from "apollo-server-express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedisStore from "rate-limit-redis";
import { applyMiddleware } from "graphql-middleware";
import * as express from "express";
import { RedisPubSub } from "graphql-redis-subscriptions";
import * as cors from "cors";
import * as http from "http";

import { redis } from "./redis";
import { createTypeormConn } from "./utils/createTypeormConn";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import { redisSessionPrefix, listingCacheKey } from "./constants";
import { createTestConn } from "./testUtils/createTestConn";
// import { middlewareShield } from "./shield";
import { middleware } from "./middleware";
import { userLoader } from "./loaders/UserLoader";
import { Listing } from "./entity/Listing";

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session as any);

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const schema = genSchema() as any;
  applyMiddleware(schema, middleware);

  const pubsub = new RedisPubSub(
    process.env.NODE_ENV === "production"
      ? {
          connection: process.env.REDIS_URL as any
        }
      : {}
  );

  const apolloServer = new ApolloServer({
    subscriptions: {
      path: "/"
    },
    schema,
    context: ({ req, res }: any) => ({
      redis,
      url: req ? req.protocol + "://" + req.get("host") : "",
      session: req ? req.session : undefined,
      req,
      res,
      userLoader: userLoader(),
      pubsub
    })
  });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === "test"
          ? "*"
          : (process.env.FRONTEND_HOST as string)
    })
  );

  app.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0 // disable delaying - full speed until the max limit is reached
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    } as any)
  );

  app.use("/images", express.static("images"));

  app.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConn(true);
  } else {
    await createTypeormConn();
    // await conn.runMigrations();
  }

  // clear cache
  await redis.del(listingCacheKey);
  // fill cache
  const listings = await Listing.find();
  const listingStrings = listings.map(x => JSON.stringify(x));
  if (listingStrings.length) {
    await redis.lpush(listingCacheKey, ...listingStrings);
  }
  // console.log(await redis.lrange(listingCacheKey, 0, -1));

  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: "/"
  });

  const port = process.env.NODE_ENV === "test" ? 0 : process.env.PORT || 4000;

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${
        apolloServer.subscriptionsPath
      }`
    );
  });

  return app;
};
