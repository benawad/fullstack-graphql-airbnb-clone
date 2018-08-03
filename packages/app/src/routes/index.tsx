import * as React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { Me } from "../modules/me/Me";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
import { FindListingsConnector } from "../modules/listing/find/FindListingsConnector";

export const Routes = () => (
  <NativeRouter initialEntries={["/listing/find"]}>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route exact={true} path="/me" component={Me} />
      <Route
        exact={true}
        path="/listing/create"
        component={CreateListingConnector}
      />
      <Route
        exact={true}
        path="/listing/find"
        component={FindListingsConnector}
      />
    </Switch>
  </NativeRouter>
);
