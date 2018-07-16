import { Session } from "../../types/graphql-utils";

export const isAuthenticated = (session: Session) => {
  if (!session.userId) {
    // user is not logged in
    throw new Error("not authenticated");
  }
};
