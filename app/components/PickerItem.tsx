import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";

import { Item } from "./Picker";
import Text from "./Text";

interface Props extends TouchableOpacityProps {
  item: Item;
}

function PickerItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
