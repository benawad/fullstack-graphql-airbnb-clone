import { ResolverMap } from "../../../types/graphql-utils";
import { listingCacheKey } from "../../../constants";
import { Listing } from "../../../entity/Listing";

export const resolvers: ResolverMap = {
  Listing: {
    pictureUrl: (parent, _, { url }) =>
      parent.pictureUrl && `${url}/images/${parent.pictureUrl}`,
    owner: ({ userId }, _, { userLoader }) => userLoader.load(userId)
  },
  Query: {
    findListings: async (_, __, { redis }) => {
      console.time("redis");
      const listings = (await redis.lrange(listingCacheKey, 0, -1)) || [];
      const result = listings.map((x: string) => JSON.parse(x));
      console.timeEnd("redis");
      console.time("db");
      const result2 = await Listing.find();
      console.timeEnd("db");
      return result || result2;
    }
  }
};
