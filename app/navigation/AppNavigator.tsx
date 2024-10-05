import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import AccountScreen from "../screens/AccountScreen";
import LessonsNavigator from "./LessonsNavigator";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: "tomato",
      tabBarActiveTintColor: "white",
      tabBarInactiveBackgroundColor: "#eee",
      tabBarInactiveTintColor: "#000",
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
        headerShown: false,
      }}
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
