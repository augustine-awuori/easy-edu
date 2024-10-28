import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Yup from "yup";

import { DataError } from "../api/client";
import {
  Form,
  FormField,
  SubmitButton,
  FormTextArea,
  ErrorMessage,
} from "./forms";
import { UploadScreen } from "../screens";
import lessonsApi from "../api/lessons";
import Button from "./Button";

interface Props {
  courseId: string;
  onDone: () => void;
}

const schema = Yup.object().shape({
  title: Yup.string().required().label("Lesson's title"),
  notes: Yup.string().required().label("Lesson's notes"),
});

export type NewLesson = Yup.InferType<typeof schema>;

const LessonUploadForm: React.FC<Props> = ({ courseId, onDone }) => {
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const handleSubmit = async (lesson: NewLesson) => {
    try {
      if (!courseId) return setError("Course's unknown, reload app!");
      if (error) setError("");

      setUploadVisible(true);
      const res = await lessonsApi.createLesson(
        { ...lesson, course: courseId },
        setProgress
      );
      setSuccessful(res.ok);

      if (!res.ok) setError((res.data as DataError).error || res.problem);
    } catch (error) {
      setUploadVisible(false);
      setError("Something went wrong");
    }
  };

  const completeTask = () => {
    setUploadVisible(false);
    if (successful) onDone();
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={completeTask}
      />
      <Text style={styles.title}>New Lesson</Text>
      <Form
        initialValues={{ title: "", notes: "" }}
        onSubmit={(values) => handleSubmit(values as NewLesson)}
        validationSchema={schema}
      >
        <ErrorMessage error={error} visible={Boolean(error)} />
        <FormField name="title" placeholder="Title" />
        <FormTextArea name="notes" placeholder="Lesson Notes" />
        <SubmitButton title="Save Lesson" />
        <Button title="Cancel" onPress={onDone} />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
  },
});

export default LessonUploadForm;
