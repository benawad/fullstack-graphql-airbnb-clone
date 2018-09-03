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
  loadMore: () => void;
  hasMoreListings: boolean;
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
        {({ data, loading, fetchMore }) => {
          let listings: SearchListingsQuery_searchListings[] = [];

          if (data && data.searchListings) {
            listings = data.searchListings;
          }

          // limit 5
          // 2
          // 2 % 5 = 2
          // 5 % 5 = 0
          // 5, 10, 15, 20
          let hasMoreListings = listings.length % variables.limit === 0;
          // listings length: 5
          // offset: 0
          // offset: 5

          if (listings.length <= variables.offset) {
            hasMoreListings = false;
          }

          return children({
            hasMoreListings,
            listings,
            loading,
            loadMore: () => {
              fetchMore({
                variables: {
                  ...variables,
                  offset: listings.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) {
                    return prev;
                  }
                  return {
                    ...prev,
                    searchListings: [
                      ...prev.searchListings,
                      ...fetchMoreResult.searchListings
                    ]
                  };
                }
              });
            }
          });
        }}
      </Query>
    );
  }
}
