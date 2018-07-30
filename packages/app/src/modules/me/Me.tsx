import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Text } from "react-native";

const meQuery = gql`
  {
    me {
      id
      email
    }
  }
`;

export class Me extends React.PureComponent {
  render() {
    return (
      <Query query={meQuery}>
        {({ data }) => {
          return <Text style={{ fontSize: 30 }}>{JSON.stringify(data)}</Text>;
        }}
      </Query>
    );
  }
}
