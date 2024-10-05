import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Define the prop types
interface IconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap; // Icon name must match MaterialCommunityIcons
  size?: number; // Optional size with a default value
  backgroundColor?: string; // Optional background color
  iconColor?: string; // Optional icon color
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

// Style the icon container
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Icon;
