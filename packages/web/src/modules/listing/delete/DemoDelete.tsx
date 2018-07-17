import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export class DemoDelete extends React.PureComponent {
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation {
            deleteListing(id: "2a376028-384e-4440-b941-a5c1baf4be0c")
          }
        `}
      >
        {mutate => <button onClick={() => mutate()}>delete listing</button>}
      </Mutation>
    );
  }
}
