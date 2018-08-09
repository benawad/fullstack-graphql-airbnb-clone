// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  ViewListingQuery_viewListing,
  ViewListingQuery,
  ViewListingQueryVariables
} from "../../schemaTypes";

export const viewListingQuery = gql`
  query ViewListingQuery($id: String!) {
    viewListing(id: $id) {
      id
      name
      category
      pictureUrl
      owner {
        id
        email
      }
    }
  }
`;

export interface WithViewListing {
  listing: ViewListingQuery_viewListing | null;
  loading: boolean;
}

export const withViewListing = graphql<
  any,
  ViewListingQuery,
  ViewListingQueryVariables,
  WithViewListing
>(viewListingQuery, {
  props: ({ data }) => {
    let listing: ViewListingQuery_viewListing | null = null;

    if (data && !data.loading && data.viewListing) {
      listing = data.viewListing;
    }

    return {
      listing,
      loading: data ? data.loading : false
    };
  },
  options: props => ({ variables: { id: props.listingId } })
});
