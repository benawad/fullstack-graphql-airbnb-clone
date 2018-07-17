import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export class CreateListingConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  render() {
    const { history } = this.props;
    return (
      <div>
        <p>secret info</p>
        <button onClick={() => history.push("/delete-demo")}>
          go to delete listing page
        </button>
      </div>
    );
  }
}
