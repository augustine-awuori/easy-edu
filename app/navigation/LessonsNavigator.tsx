import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "./routes";
import LessonScreen from "../screens/LessonScreen";
import LessonsScreen from "../screens/LessonsScreen";

const Stack = createNativeStackNavigator();

const LessonsNavigator = () => (
  <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
    <Stack.Screen name={routes.LESSONS} component={LessonsScreen} />
    <Stack.Screen name={routes.LESSON} component={LessonScreen} />
  </Stack.Navigator>
);

export default LessonsNavigator;
