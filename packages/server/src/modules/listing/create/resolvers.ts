import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input }, { session }) => {
      console.log(session);

      if (!session.userId) {
        // user is not logged in
        throw new Error("not authenticated");
      }

      await Listing.create({
        ...input,
        pictureUrl: "",
        userId: session.userId
      }).save();

      return true;
    }
  }
};
