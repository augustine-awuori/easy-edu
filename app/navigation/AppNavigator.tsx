import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { AccountScreen, CourseEditScreen } from "../screens";
import colors from "../config/colors";
import CoursesNavigator from "./CoursesNavigator";
import NewCourseButton from "./NewCourseButton";
import routes from "./routes";

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
      name={routes.COURSES_NAVIGATOR}
      component={CoursesNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <FontAwesome name="home" size={size} color={color} />
        ),
        title: "Courses",
      }}
    />
    <Tab.Screen
      name={routes.COURSE_EDIT}
      component={CourseEditScreen}
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
