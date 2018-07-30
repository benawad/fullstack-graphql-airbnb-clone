import * as React from "react";
import { LoginController } from "@abb/controller";
import { RouteComponentProps } from "react-router-native";
// import { SecureStore } from "expo";

import { LoginView } from "./ui/LoginView";
// import { SID_KEY } from "../shared/constants";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  // saveSessionId = (sid: string) => {
  //   SecureStore.setItemAsync(SID_KEY, sid);
  // };

  onFinish = () => {
    this.props.history.push("/me");
  };

  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
