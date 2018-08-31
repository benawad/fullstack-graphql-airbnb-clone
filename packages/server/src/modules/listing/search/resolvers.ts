import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    searchListings: async (
      _,
      { input: { name, guests, beds }, limit, offset }
    ) => {
      let listingQB = getConnection()
        .getRepository(Listing)
        .createQueryBuilder("l");
      if (guests) {
        listingQB = listingQB.andWhere("l.guests = :guests", { guests });
      }
      if (beds) {
        listingQB = listingQB.andWhere("l.beds = :beds", { beds });
      }
      if (name) {
        listingQB = listingQB.andWhere("l.name ilike :name", {
          name: `%${name}%`
        });
      }

      return listingQB
        .take(limit)
        .skip(offset)
        .getMany();
    }
  }
};
