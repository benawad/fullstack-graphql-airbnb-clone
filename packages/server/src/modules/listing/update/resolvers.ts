import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { processUpload } from "../shared/processUpload";
// import { isAuthenticated } from "../../shared/isAuthenticated";

// house.png
// aseq2-house.png
// image/png
// image/jpeg
// ['image', 'jpeg']
// 'jpeg'

export const resolvers: ResolverMap = {
  Mutation: {
    updateListing: async (_, { listingId, input: { picture, ...data } }) => {
      // isAuthenticated(session);
      // 1. user uploads a new picture
      if (picture) {
        data.pictureUrl = await processUpload(picture);
      }

      // 2. user remove picture
      // 3. do nothing

      await Listing.update(
        {
          id: listingId
        },
        {
          ...data
        }
      );

      return true;
    }
  }
};
