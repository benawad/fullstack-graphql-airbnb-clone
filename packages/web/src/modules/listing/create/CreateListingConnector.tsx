import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export class CreateListingConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  render() {
    const { history } = this.props;
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <button onClick={() => history.push("/create-listing2")}>
        secret info
      </button>
    );
  }
}
