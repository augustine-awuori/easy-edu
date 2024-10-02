import React, { PropsWithChildren } from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

interface Props extends PropsWithChildren {
  style?: object;
}

function AppText({ children, style }: Props) {
  return <Text style={[defaultStyles.text, style]}>{children}</Text>;
}

export default AppText;
