import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LessonScreen, LessonsScreen } from "../screens";
import routes from "./routes";

const Stack = createNativeStackNavigator();

const LessonsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "fade_from_bottom",
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name={routes.LESSONS}
      component={LessonsScreen}
      options={{ title: "All Lessons" }}
    />
    <Stack.Screen name={routes.LESSON} component={LessonScreen} />
  </Stack.Navigator>
);

export default LessonsNavigator;
