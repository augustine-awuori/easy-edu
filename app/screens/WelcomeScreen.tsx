import React, { useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import Button from "../components/Button";
import routes from "../navigation/routes";
import useUser from "../hooks/useUser";

interface Props {
  navigation: NavigationProp<any>;
}

export default ({ navigation }: Props) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) navigation.navigate(routes.HOME);
  }, [user]);

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
        <Button
          onPress={() => navigation.navigate(routes.LOGIN)}
          title="Login"
        />
        <Button
          onPress={() => navigation.navigate(routes.REGISTER)}
          title="Register"
          color="secondary"
        />
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
