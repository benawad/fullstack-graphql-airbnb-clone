import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import { LogoutMutation } from "../../schemaTypes";

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

interface Props {
  children: (
    data: {
      logout: () => void;
    }
  ) => JSX.Element | null;
}

export const LogoutController: React.SFC<Props> = ({ children }) => (
  <Mutation<LogoutMutation, {}> mutation={logoutMutation}>
    {(mutate, { client }) =>
      children({
        logout: async () => {
          await mutate();
          await client.resetStore();
        }
      })
    }
  </Mutation>
);
