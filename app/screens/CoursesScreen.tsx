import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useCourses, { Course } from "../hooks/useCourses";

interface Props {
  navigation: NavigationProp<any>;
}

export default ({ navigation }: Props) => {
  const { courses } = useCourses();

  const viewCourse = (course: Course) =>
    navigation.navigate(routes.LESSON, course);

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
});
