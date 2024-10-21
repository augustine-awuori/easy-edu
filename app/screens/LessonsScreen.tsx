import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import { Course, getCourses } from "../services/data";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";

interface Props {
  navigation: NavigationProp<any>;
}

export default ({ navigation }: Props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const viewCourse = (course: Course) =>
    navigation.navigate(routes.LESSON, course);

  return (
    <FlatList
      data={courses}
      keyExtractor={(c) => c.name}
      style={styles.container}
      renderItem={({ item }) => (
        <Card
          title={item.name}
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
