import React, { PropsWithChildren } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Constants from "expo-constants";

interface Props extends PropsWithChildren {
  style: object;
}

function Screen({ children, style }: Props) {
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
