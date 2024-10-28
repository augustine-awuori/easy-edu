import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  onDone: () => void;
}

export default ({}: Props) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
