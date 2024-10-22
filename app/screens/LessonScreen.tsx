import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";

import { Course } from "../hooks/useCourses";
import { ListItem } from "../components/lists";

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export default ({ route }: Props) => {
  const { department, images, lecturer, title: name } = route.params as Course;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: images[0] }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {name} ({department.label}){" "}
        </Text>
        <View style={styles.userContainer}>
          <ListItem
            image={
              lecturer?.profileImage || require("../assets/background.jpg")
            }
            title={lecturer?.name || "Unknown"}
            subTitle="Instructor"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});
