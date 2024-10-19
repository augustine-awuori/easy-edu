import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
  images: Yup.array().min(1, "Please select at least one image.").required(),
  title: Yup.string().required().min(1).label("Title"),
});

type Info = Yup.InferType<typeof validationSchema>;

export default () => {
  const handleSubmit = async (info: Info) => {
    console.log("info", info);
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          description: "",
          category: "",
        }}
        onSubmit={(values) => handleSubmit(values as unknown as Info)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <Picker
          name="category"
          items={[{ label: "Computing", value: "s" }]}
          placeholder="Course Category"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
