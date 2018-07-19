import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../../modules/shared/InputField";

export const Page3 = () => (
  <>
    <Field name="latitude" placeholder="Latitude" component={InputField} />
    <Field name="longitude" placeholder="Longitude" component={InputField} />
    <Field name="amenities" placeholder="Amenities" component={InputField} />
  </>
);
