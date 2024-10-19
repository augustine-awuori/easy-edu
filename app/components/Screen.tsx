import React from "react";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Constants from "expo-constants";

function Screen({ children, style }: SafeAreaViewProps) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
