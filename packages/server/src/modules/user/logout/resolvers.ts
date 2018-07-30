import { ResolverMap } from "../../../types/graphql-utils";
import { removeAllUsersSessions } from "../../../utils/removeAllUsersSessions";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis, res }) => {
      const { userId } = session;
      if (userId) {
        removeAllUsersSessions(userId, redis);
        session.destroy(err => {
          if (err) {
            console.log(err);
          }
        });
        res.clearCookie("qid");
        return true;
      }

      return false;
    }
  }
};
