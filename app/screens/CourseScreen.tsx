import React, { useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";

import { Course } from "../hooks/useCourses";
import { ListItem } from "../components/lists";
import Button from "../components/Button";
import LessonUploadForm from "../components/LessonUploadForm";

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export default ({ route }: Props) => {
  const [addingLesson, setAddingLesson] = useState(false);
  const { _id, department, images, lecturer, title } = route.params as Course;

  const addLesson = () => {
    setAddingLesson(true);
    // setAddingLesson(false);
  };

  return (
    <ScrollView>
      <Modal visible={addingLesson}>
        <LessonUploadForm
          courseId={_id}
          onDone={() => setAddingLesson(false)}
        />
      </Modal>

      <Image style={styles.image} source={{ uri: images[0] }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {title} ({department.label})
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
      <View style={styles.buttonsContainer}>
        <Button onPress={addLesson} title="Add Lesson" color="secondary" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingHorizontal: 20,
    width: "100%",
  },
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
    marginVertical: 10,
  },
});
