import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import { Item } from "../components/Picker";
import coursesApi from "../api/courses";
import FormImagePicker from "../components/forms/FormImagePicker";
import imageStorage from "../db/image";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";

const schema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category").required(),
  description: Yup.string().label("Description"),
  images: Yup.array().min(1, "Please select at least one image.").required(),
  title: Yup.string().required().min(1).label("Title"),
});

export type CourseInfo = Yup.InferType<typeof schema>;

export default () => {
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);

  const handleSubmit = async (info: CourseInfo) => {
    const { category, title, description } = info;

    setUploadVisible(true);
    setProgress(0);
    const images = await imageStorage.saveImages(info.images);
    const res = await coursesApi.addCourse(
      {
        images,
        category: (category as Item).value,
        title,
        description,
      },
      setProgress
    );

    if (res.ok) Toast.success("Courses created successfully");
    else {
      Toast.error("Something went wrong! Course isn't saved");
      imageStorage.deleteImages(images);
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={() => setUploadVisible(false)}
      />
      <Form
        initialValues={{
          title: "",
          description: "",
          category: "",
        }}
        onSubmit={(values) => handleSubmit(values as unknown as CourseInfo)}
        validationSchema={schema}
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
