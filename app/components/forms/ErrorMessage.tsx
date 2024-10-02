import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../Text";

interface Props {
  error: string | undefined;
  visible: boolean;
}

function ErrorMessage({ error, visible }: Props) {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});

export default ErrorMessage;
