// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import {
  CreateMessageMutation,
  CreateMessageMutationVariables
} from "../../schemaTypes";

export const createMessageMutation = gql`
  mutation CreateMessageMutation($message: MessageInput!) {
    createMessage(message: $message)
  }
`;

export interface WithCreateMessage {
  createMessage: MutationFn<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >;
}

interface Props {
  children: (data: WithCreateMessage) => JSX.Element | null;
}

export class CreateMessage extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<CreateMessageMutation, CreateMessageMutationVariables>
        mutation={createMessageMutation}
      >
        {mutate => {
          return children({
            createMessage: mutate
          });
        }}
      </Mutation>
    );
  }
}
