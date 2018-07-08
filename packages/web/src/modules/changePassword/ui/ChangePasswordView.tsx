import * as React from "react";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { NormalizedErrorMap } from "@abb/controller";
import { changePasswordSchema } from "@abb/common";

import { InputField } from "../../shared/InputField";

const FormItem = AntForm.Item;

interface FormValues {
  newPassword: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="newPassword"
            type="password"
            placeholder="New Password"
            prefix={
              <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> as any
            }
            component={InputField}
          />
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              change password
            </Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const ChangePasswordView = withFormik<Props, FormValues>({
  validationSchema: changePasswordSchema,
  mapPropsToValues: () => ({ newPassword: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
