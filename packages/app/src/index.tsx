import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Routes } from "./routes";
import { client } from "./apollo";

export default class App extends React.PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}
