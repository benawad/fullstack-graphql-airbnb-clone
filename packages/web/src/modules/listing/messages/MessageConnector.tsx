import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ViewMessages } from "@abb/controller";
import { InputBar } from "./InputBar";

export class MessageConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  unsubscribe: () => void;

  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <ViewMessages listingId={listingId}>
        {({ loading, messages, subscribe }) => {
          if (loading) {
            return <div>...loading</div>;
          }

          if (!this.unsubscribe) {
            this.unsubscribe = subscribe();
          }

          return (
            <div>
              {messages.map((m, i) => (
                <div key={`${i}-lm`}>{m.text}</div>
              ))}
              <InputBar listingId={listingId} />
              <button onClick={this.unsubscribe}>unsubscribe</button>
            </div>
          );
        }}
      </ViewMessages>
    );
  }
}
