import React from "react";
import { TextInputProps } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Make sure this is the correct import for the icons you want

import { FormValues } from "./AppForm";
import AppTextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

interface Props extends TextInputProps {
  name: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

function AppFormField({ name, ...otherProps }: Props) {
  const { setFieldTouched, handleChange, errors, touched } =
    useFormikContext<FormValues>();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={Boolean(touched[name])} />
    </>
  );
}

export default AppFormField;
