import React from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";

import Button from "../components/Button";

export default () => {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Easy Education</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button onPress={console.log} title="Login" />
        <Button onPress={console.log} title="Register" color="secondary" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 70,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
