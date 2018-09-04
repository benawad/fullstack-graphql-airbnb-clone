import * as React from "react";
import { NativeRouter, Route, Switch, Link } from "react-router-native";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { Me } from "../modules/me/Me";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
import { FindListingsConnector } from "../modules/listing/find/FindListingsConnector";
import { Icon } from "react-native-elements";
import { View, TouchableOpacity } from "react-native";

export const Routes = () => (
  <NativeRouter initialEntries={["/listing/find"]}>
    <Switch>
      <View style={{ flex: 1 }}>
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
        <View
          style={{
            height: 70,
            backgroundColor: "#f2f2f2",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingTop: 10
          }}
        >
          <Link component={TouchableOpacity} to="/login">
            <Icon type="entypo" name="login" size={30} />
          </Link>
          <Link component={TouchableOpacity} to="/listing/create">
            <Icon name="add-circle" size={30} />
          </Link>
          <Link component={TouchableOpacity} to="/listing/find">
            <Icon name="list" size={30} />
          </Link>
        </View>
      </View>
    </Switch>
  </NativeRouter>
);
