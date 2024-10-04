import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountScreen from "../screens/AccountScreen";
import LessonScreen from "../screens/LessonScreen";
import LessonsScreen from "../screens/LessonsScreen";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name={routes.LESSONS} component={LessonsScreen} />
    <Tab.Screen name={routes.LESSON} component={LessonScreen} />
    <Tab.Screen name={routes.ACCOUNT} component={AccountScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
