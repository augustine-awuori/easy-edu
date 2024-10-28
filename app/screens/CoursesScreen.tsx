import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useCourses, { Course } from "../hooks/useCourses";

interface Props {
  navigation: NavigationProp<any>;
}

export default ({ navigation }: Props) => {
  const { courses, loading } = useCourses();

  const viewCourse = (course: Course) =>
    navigation.navigate(routes.LESSON, course);

  if (loading && !courses.length)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (!courses.length && !loading)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No courses available.</Text>
      </View>
    );

  return (
    <FlatList
      data={courses}
      keyExtractor={(c) => c._id}
      style={styles.container}
      renderItem={({ item }) => (
        <Card
          title={item.title}
          subTitle={item.department.label}
          onPress={() => viewCourse(item)}
          imageUrl={item.images[0]}
          thumbnailUrl={item.images[0]}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: colors.danger,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: colors.medium,
  },
});
