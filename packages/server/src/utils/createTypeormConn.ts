import { getConnectionOptions, createConnection } from "typeorm";
import { User } from "../entity/User";
import { Listing } from "../entity/Listing";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User, Listing],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
