import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Routes } from "./routes";
import { client } from "./apollo";

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default class App extends React.PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}
