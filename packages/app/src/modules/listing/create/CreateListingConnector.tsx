import * as React from "react";
import { Formik, Field, FormikActions } from "formik";
import { withCreateListing, WithCreateListing } from "@abb/controller";
import { RouteComponentProps } from "react-router-native";
import { Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { InputField } from "../../shared/InputField";
import { CheckboxGroupField } from "../../shared/CheckboxGroupField";
import { PictureField } from "../../shared/PictureField";

interface FormValues {
  picture: null;
  name: string;
  category: string;
  description: string;
  price: string;
  beds: string;
  guests: string;
  latitude: string;
  longitude: string;
  amenities: string[];
}

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListing
> {
  submit = async (
    { price, beds, guests, latitude, longitude, ...values }: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    console.log(values);
    await this.props.createListing({
      ...values,
      price: parseInt(price, 10),
      beds: parseInt(beds, 10),
      guests: parseInt(guests, 10),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });
    setSubmitting(false);
  };

  render() {
    return (
      <Formik<{}, FormValues>
        initialValues={{
          picture: null,
          name: "",
          category: "",
          description: "",
          price: "0",
          beds: "0",
          guests: "0",
          latitude: "0",
          longitude: "0",
          amenities: []
        }}
        onSubmit={this.submit}
      >
        {({ handleSubmit, values }) =>
          console.log(values) || (
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 30, marginBottom: 10 }}>
                Create Listing
              </Text>
              <Field name="name" placeholder="Name" component={InputField} />
              <Field
                name="picture"
                title="pick a picture"
                component={PictureField as any}
              />
              <Field
                name="category"
                placeholder="Category"
                component={InputField}
              />
              <Field
                name="description"
                placeholder="Description"
                component={InputField}
              />
              <Field
                label="Price"
                name="price"
                placeholder="Price"
                component={InputField}
                keyboardType="numeric"
              />
              <Field
                label="Beds"
                name="beds"
                placeholder="Beds"
                component={InputField}
                keyboardType="numeric"
              />
              <Field
                label="Guests"
                name="guests"
                placeholder="Guests"
                component={InputField}
                keyboardType="numeric"
              />
              <Field
                label="Latitude"
                name="latitude"
                placeholder="Latitude"
                component={InputField}
                keyboardType="numeric"
              />
              <Field
                label="Longtitude"
                name="longitude"
                placeholder="Longitude"
                component={InputField}
                keyboardType="numeric"
              />
              <Field
                name="amenities"
                options={["pool", "basketball court", "soccer field", "yard"]}
                component={CheckboxGroupField as any}
              />
              <Button onPress={handleSubmit} title="save listing" />
            </ScrollView>
          )
        }
      </Formik>
    );
  }
}

export const CreateListingConnector = withCreateListing(C);
