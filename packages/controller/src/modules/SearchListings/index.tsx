// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  SearchListingsQuery,
  SearchListingsQueryVariables,
  SearchListingsQuery_searchListings
} from "../../schemaTypes";

export const searchListingsQuery = gql`
  query SearchListingsQuery(
    $input: SearchListingsInput
    $offset: Int!
    $limit: Int!
  ) {
    searchListings(input: $input, offset: $offset, limit: $limit) {
      id
      name
      category
      description
      price
      beds
      guests
      longitude
      latitude
      amenities
      pictureUrl
      owner {
        id
        email
      }
    }
  }
`;

export interface WithSearchListings {
  listings: SearchListingsQuery_searchListings[];
  loading: boolean;
}

interface Props {
  variables: SearchListingsQueryVariables;
  children: (data: WithSearchListings) => JSX.Element | null;
}

export class SearchListings extends React.PureComponent<Props> {
  render() {
    const { children, variables } = this.props;
    return (
      <Query<SearchListingsQuery, SearchListingsQueryVariables>
        query={searchListingsQuery}
        variables={variables}
      >
        {({ data, loading }) => {
          let listings: SearchListingsQuery_searchListings[] = [];

          if (data && data.searchListings) {
            listings = data.searchListings;
          }

          return children({
            listings,
            loading
          });
        }}
      </Query>
    );
  }
}
