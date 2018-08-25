// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import {
  UpdateListingMutation,
  UpdateListingMutationVariables
} from "../../schemaTypes";

export const updateListingMutation = gql`
  mutation UpdateListingMutation(
    $listingId: String!
    $input: UpdateListingInput!
  ) {
    updateListing(listingId: $listingId, input: $input)
  }
`;

export interface WithUpdateListing {
  updateListing: MutationFn<
    UpdateListingMutation,
    UpdateListingMutationVariables
  >;
}

interface Props {
  children: (data: WithUpdateListing) => JSX.Element | null;
}

export class UpdateListing extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<UpdateListingMutation, UpdateListingMutationVariables>
        mutation={updateListingMutation}
      >
        {mutate => {
          return children({
            updateListing: mutate
          });
        }}
      </Mutation>
    );
  }
}
