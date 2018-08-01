import * as React from "react";
import { FieldProps } from "formik";
import { CheckBox } from "react-native-elements";

export class CheckboxGroupField extends React.Component<
  FieldProps<any> & {
    options: string[];
  }
> {
  onPress = (optionName: string, checked: boolean) => {
    const {
      field,
      form: { setFieldValue }
    } = this.props;
    if (checked) {
      setFieldValue(
        field.name,
        field.value.filter((x: string) => x !== optionName)
      );
    } else {
      // [...["pool", "asd"], "aasjdfklas"]
      // ["asdfa", "dafs", "addsfs"]
      setFieldValue(field.name, [...field.value, optionName]);
    }
  };

  render() {
    const {
      field: { value }, // { name, value, onChange, onBlur }
      options
    } = this.props;
    return (
      <React.Fragment>
        {options.map(option => {
          const checked = value.includes(option);
          return (
            <CheckBox
              key={option}
              title={option}
              checked={checked}
              onPress={() => this.onPress(option, checked)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
