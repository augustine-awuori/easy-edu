import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";

import {
  ErrorMessage,
  Form,
  FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import { Item } from "../components/Picker";
import { useDepartments } from "../hooks";
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
  const [error, setError] = useState("");
  const { departments } = useDepartments();

  const handleSubmit = async (info: CourseInfo) => {
    const { category, title, description } = info;

    setUploadVisible(true);
    setProgress(0);
    if (error) setError("");
    const images = await imageStorage.saveImages(info.images);
    const res = await coursesApi.addCourse(
      {
        images,
        category: (category as Item)._id,
        title,
        description,
      },
      setProgress
    );

    if (res.ok) Toast.success("Courses created successfully");
    else {
      const errorMessage = "Something went wrong! Course isn't saved";
      Toast.error(errorMessage);
      setError(errorMessage);
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
        <ErrorMessage error={error} visible={Boolean(error)} />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <Picker
          name="category"
          items={departments}
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
