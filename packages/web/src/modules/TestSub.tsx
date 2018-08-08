import * as React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const SUB = gql`
  subscription {
    newMessage(listingId: "753cb413-8f8a-4edb-b89c-eb57cb1ae9f6") {
      text
      user {
        id
        email
      }
      listingId
    }
  }
`;

export class TestSub extends React.PureComponent {
  render() {
    return (
      <Subscription subscription={SUB}>
        {data => {
          console.log(data);
          return null;
        }}
      </Subscription>
    );
  }
}
