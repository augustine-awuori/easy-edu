import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Toast } from "toastify-react-native";

import { Lesson, ScreenProps } from "./CourseScreen";
import { useUser } from "../hooks";
import Button from "../components/Button";
import courseApi from "../api/courses";

const LessonDetailScreen = ({ navigation, route }: ScreenProps) => {
  const lesson = route.params as Lesson;
  const { user } = useUser();

  const completeLesson = async () => {
    const res = await courseApi.updateCourse(lesson.course._id);

    if (res.ok) {
      Toast.success("Course completed");
      navigation.goBack();
    } else Toast.error("Course completion couldn't be saved");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.notes}>{lesson.notes}</Text>
      </View>
      {lesson?.students?.[user?._id || ""] ? (
        <Text>Lesson completed</Text>
      ) : (
        <View style={styles.buttonsContainer}>
          <Button
            onPress={completeLesson}
            title="Add Lesson"
            color="secondary"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingHorizontal: 20,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notes: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});

export default LessonDetailScreen;
