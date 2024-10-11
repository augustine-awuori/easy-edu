import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AccountScreen,
  // CourseEditScreen
} from "../screens";
import LessonsNavigator from "./LessonsNavigator";
import NewCourseButton from "./NewCourseButton";
import routes from "./routes";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: colors.primary,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveBackgroundColor: "#eee",
      tabBarInactiveTintColor: colors.black,
      headerShown: false,
      headerTitleAlign: "center",
    }}
  >
    <Tab.Screen
      name={routes.LESSONS_NAVIGATOR}
      component={LessonsNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <FontAwesome name="home" size={size} color={color} />
        ),
        title: "Lessons",
      }}
    />
    <Tab.Screen
      name={routes.COURSE_EDIT}
      component={() => <></>}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewCourseButton
            onPress={() => navigation.navigate(routes.COURSE_EDIT)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ size, color }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }}
      name={routes.ACCOUNT}
      component={AccountScreen}
    />
  </Tab.Navigator>
);

export default AppNavigator;
