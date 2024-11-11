import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CourseScreen, CoursesScreen, LessonScreen } from "../screens";
import routes from "./routes";

const Stack = createNativeStackNavigator();

const CoursesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "fade_from_bottom",
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name={routes.COURSES}
      component={CoursesScreen}
      options={{ title: "All Courses" }}
    />
    <Stack.Screen name={routes.COURSE} component={CourseScreen} />
    <Stack.Screen name={routes.LESSON} component={LessonScreen} />
  </Stack.Navigator>
);

export default CoursesNavigator;
