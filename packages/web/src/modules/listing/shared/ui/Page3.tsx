import * as React from "react";
import { Field } from "formik";

import { TagField } from "../../../shared/TagField";
import { LocationField } from "../../../shared/LocationField";

export const Page3 = () => (
  <>
    <Field name="tmp" component={LocationField} />
    <Field name="amenities" placeholder="Amenities" component={TagField} />
  </>
);
