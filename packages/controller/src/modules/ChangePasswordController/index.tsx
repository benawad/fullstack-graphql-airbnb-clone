import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import {
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
} from "../../schemaTypes";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";

interface Props {
  children: (
    data: {
      submit: (
        values: ForgotPasswordChangeMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    ForgotPasswordChangeMutation,
    ForgotPasswordChangeMutationVariables
  >
> {
  submit = async (values: ForgotPasswordChangeMutationVariables) => {
    console.log(values);
    const {
      data: { forgotPasswordChange }
    } = await this.props.mutate({
      variables: values
    });

    console.log(forgotPasswordChange);

    if (forgotPasswordChange) {
      return normalizeErrors(forgotPasswordChange);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordChangeMutation = gql`
  mutation ForgotPasswordChangeMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

export const ChangePasswordController = graphql<
  Props,
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
>(forgotPasswordChangeMutation)(C);
