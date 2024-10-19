import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
}) => {
  return (
    <View
      style={[
        styles.iconContainer,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Icon;
