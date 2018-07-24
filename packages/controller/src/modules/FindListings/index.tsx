// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  FindListingsQuery,
  FindListingsQuery_findListings
} from "../../schemaTypes";

export const findListingsQuery = gql`
  query FindListingsQuery {
    findListings {
      id
      name
      pictureUrl
    }
  }
`;

export interface WithFindListings {
  listings: FindListingsQuery_findListings[];
  loading: boolean;
}

export const withFindListings = graphql<
  any,
  FindListingsQuery,
  {},
  WithFindListings
>(findListingsQuery, {
  props: ({ data }) => {
    let listings: FindListingsQuery_findListings[] = [];

    if (data && !data.loading && data.findListings) {
      listings = data.findListings;
    }

    return {
      listings,
      loading: data ? data.loading : false
    };
  }
});
