import * as React from "react";
import { ViewListing } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";

export class ViewListingConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <ViewListing listingId={listingId}>
        {data => {
          console.log(data);
          if (!data.listing) {
            return <div>...loading</div>;
          }

          return <div>{data.listing.name}</div>;
        }}
      </ViewListing>
    );
  }
}
