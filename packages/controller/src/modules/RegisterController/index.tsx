import * as React from "react";

interface Props {
  children: (
    data: { submit: (values: any) => Promise<null> }
  ) => JSX.Element | null;
}

export class RegisterController extends React.PureComponent<Props> {
  submit = async (values: any) => {
    console.log(values);
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}
