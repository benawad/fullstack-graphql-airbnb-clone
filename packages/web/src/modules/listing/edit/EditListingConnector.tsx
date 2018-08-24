import * as React from "react";
import { ViewListing } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";
import { ListingForm, defaultListingFormValues } from "../shared/ListingForm";

export class EditListingConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  submit = async (values: any) => {
    console.log(values);
  };

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

          const {
            id: _,
            pictureUrl: __,
            owner: ___,
            ...listing
          } = data.listing;

          return (
            <ListingForm
              initialValues={{
                ...defaultListingFormValues,
                ...listing
              }}
              submit={this.submit}
            />
          );
        }}
      </ViewListing>
    );
  }
}
