import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppTextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { FormValues } from "./AppForm";

interface Props extends TextInputProps {
  name: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function AppFormTextArea({ name, icon, ...otherProps }: Props) {
  const { setFieldTouched, handleChange, errors, touched } =
    useFormikContext<FormValues>();
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);

  const formatTextStyle = {
    fontWeight: isBold ? "bold" : "normal",
    fontStyle: isItalic ? "italic" : "normal",
    textDecorationLine: isUnderline ? "underline" : "none",
  };

  return (
    <>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => setBold(!isBold)}>
          <MaterialCommunityIcons
            name="format-bold"
            size={24}
            color={isBold ? "black" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setItalic(!isItalic)}>
          <MaterialCommunityIcons
            name="format-italic"
            size={24}
            color={isItalic ? "black" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUnderline(!isUnderline)}>
          <MaterialCommunityIcons
            name="format-underline"
            size={24}
            color={isUnderline ? "black" : "grey"}
          />
        </TouchableOpacity>
      </View>
      <AppTextInput
        multiline
        numberOfLines={5}
        style={[styles.textArea]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={Boolean(touched[name])} />
    </>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
  },
  textArea: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
});
