import * as React from "react";
import { ForgotPasswordView } from "../../../../../node_modules/@abb/web/src/modules/forgotPassword/ui/ForgotPasswordView";

export class ForgotPasswordConnector extends React.PureComponent {
  dummy = async (values: any) => {
    console.log(values);
    return null;
  };

  render() {
    return <ForgotPasswordView submit={this.dummy} />;
  }
}
