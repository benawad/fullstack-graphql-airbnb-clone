import * as React from "react";
import { ViewWrapper } from "./ViewWrapper";
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
      <ViewWrapper listingId={listingId}>
        {(data: any) => {
          console.log(data);

          if (!data.listing) {
            return <div>...loading</div>;
          }

          return <div>{data.listing.name}</div>;
        }}
      </ViewWrapper>
    );
  }
}
