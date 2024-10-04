import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "./routes";
import HomeScreen from "../screens/HomeScreen";
import LessonScreen from "../screens/LessonScreen";

const Stack = createNativeStackNavigator();

const LessonsNavigator = () => (
  <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
    <Stack.Screen name={routes.HOME} component={HomeScreen} />
    <Stack.Screen name={routes.LESSON} component={LessonScreen} />
  </Stack.Navigator>
);

export default LessonsNavigator;
