import * as React from "react";
import { Formik, Form, Field } from "formik";
import { CreateMessage } from "@abb/controller";
import { InputField } from "../../shared/InputField";

interface FormValues {
  text: string;
}

interface Props {
  listingId: string;
}

export class InputBar extends React.PureComponent<Props> {
  render() {
    const { listingId } = this.props;
    return (
      <CreateMessage>
        {({ createMessage }) => (
          <Formik<{}, FormValues>
            initialValues={{ text: "" }}
            onSubmit={async ({ text }, { resetForm }) => {
              await createMessage({
                variables: {
                  message: {
                    text,
                    listingId
                  }
                }
              });
              resetForm();
            }}
          >
            {() => (
              <Form>
                <Field name="text" component={InputField} />
                <button type="submit">send message</button>
              </Form>
            )}
          </Formik>
        )}
      </CreateMessage>
    );
  }
}
