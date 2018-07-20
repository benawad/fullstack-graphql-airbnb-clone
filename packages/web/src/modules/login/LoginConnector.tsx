import * as React from "react";
import { LoginController } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";

import { LoginView } from "./ui/LoginView";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    const {
      history,
      location: { state }
    } = this.props;
    if (state && state.next) {
      return history.push(state.next);
    }

    history.push("/");
  };

  render() {
    console.log(this.props.location.state);

    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
