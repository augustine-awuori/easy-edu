import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Lesson, ScreenProps } from "./CourseScreen";

const LessonDetailScreen = ({ route }: ScreenProps) => {
  const lesson = route.params as Lesson;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.notes}>{lesson.notes}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
