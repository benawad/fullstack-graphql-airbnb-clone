import * as React from "react";
import { Field } from "formik";

import { InputField } from "../../../../modules/shared/InputField";
import { TagField } from "../../../shared/TagField";

export const Page3 = () => (
  <>
    <Field
      label="Latitude"
      name="latitude"
      placeholder="Latitude"
      component={InputField}
      useNumberComponent={true}
    />
    <Field
      label="Longtitude"
      name="longitude"
      placeholder="Longitude"
      component={InputField}
      useNumberComponent={true}
    />
    <Field name="amenities" placeholder="Amenities" component={TagField} />
  </>
);
