import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";

import { ListItem } from "../components/lists";
import { useUser } from "../hooks";
import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import LessonUploadForm, { NewLesson } from "../components/LessonUploadForm";
import useCourses, { Course } from "../hooks/useCourses";
import routes from "../navigation/routes";

export interface ScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export interface Lesson extends NewLesson {
  _id: string;
  course: Course;
}

export default ({ navigation, route }: ScreenProps) => {
  const { _id, department, images, lecturer, title } = route.params as Course;
  const [addingLesson, setAddingLesson] = useState(false);
  const { fetchCourseLessons } = useCourses();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const initLessons = async () => {
      setLessons(await fetchCourseLessons(_id));
      setLoading(false);
    };

    initLessons();
  }, [_id]);

  const renderLesson = ({ item: lesson }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.lessonContainer}
      onPress={() => navigation.navigate(routes.LESSON, lesson)}
    >
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <Text style={styles.lessonNotes} numberOfLines={2}>
        {lesson.notes}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <Modal visible={addingLesson} animationType="slide">
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

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={(lesson) => lesson._id}
          renderItem={renderLesson}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text>No lessons available.</Text>}
        />
      )}

      {user?._id === lecturer._id && (
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => setAddingLesson(true)}
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
    marginVertical: 5,
  },
  listContainer: {
    padding: 20,
  },
  lessonContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  lessonNotes: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
