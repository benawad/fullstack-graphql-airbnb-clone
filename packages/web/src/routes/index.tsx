import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthRoute } from "@abb/controller";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { ForgotPasswordConnector } from "../modules/forgotPassword/ForgotPasswordConnector";
import { ChangePasswordConnector } from "../modules/changePassword/ChangePasswordConnector";
import { TextPage } from "../modules/TextPage";
import { DemoDelete } from "../modules/listing/delete/DemoDelete";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
import { FindListingsConnector } from "../modules/listing/find/FindListingsConnector";
import { Logout } from "../modules/logout";
import { TestSub } from "../modules/TestSub";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route
        exact={true}
        path="/forgot-password"
        component={ForgotPasswordConnector}
      />
      <Route
        exact={true}
        path="/change-password/:key"
        component={ChangePasswordConnector}
      />
      <Route path="/m" component={TextPage} />
      <Route path="/listings" component={FindListingsConnector} />
      <Route path="/logout" component={Logout} />
      <Route path="/test-sub" component={TestSub} />
      <AuthRoute path="/create-listing" component={CreateListingConnector} />
      <AuthRoute path="/delete-demo" component={DemoDelete} />
    </Switch>
  </BrowserRouter>
);
