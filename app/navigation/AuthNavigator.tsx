import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen, RegisterScreen, WelcomeScreen } from "../screens";
import routes from "./routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
