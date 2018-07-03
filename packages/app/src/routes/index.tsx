import * as React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";

export const Routes = () => (
  <NativeRouter initialEntries={["/login"]}>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
    </Switch>
  </NativeRouter>
);
