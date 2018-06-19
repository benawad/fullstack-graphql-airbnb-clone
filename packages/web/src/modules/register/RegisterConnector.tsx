import * as React from "react";
import { RegisterController } from "@abb/controller";

import { RegisterView } from "./ui/RegisterView";

// container -> view
// container -> connector -> view
// controller -> connector -> view

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}
