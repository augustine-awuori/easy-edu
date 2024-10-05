import React from "react";
import { Text, TextProps } from "react-native";

import defaultStyles from "../config/styles";

function AppText({ children, style }: TextProps) {
  return <Text style={[defaultStyles.text, style]}>{children}</Text>;
}

export default AppText;
