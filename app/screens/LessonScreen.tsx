import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import useCourses from "../hooks/useCourses";
import { Lesson, ScreenProps } from "./CourseScreen";

const LessonDetailScreen = ({ route }: ScreenProps) => {
  //   const { lessonId } = route.params;
  const lessonId = "";
  const {} = useCourses();
  const [lesson, setLesson] = useState<Lesson>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadLessonDetails = async () => {
      //   try {
      //     const fetchedLesson = await fetchLessonDetails(lessonId);
      //     setLesson(fetchedLesson);
      //   } catch (err) {
      //     setError(true);
      //   } finally {
      //     setLoading(false);
      //   }
    };

    loadLessonDetails();
  }, [lessonId]);

  if (loading)
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );

  if (error || !lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load lesson details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.notes}>{lesson.notes}</Text>
    </View>
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
