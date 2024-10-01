import React from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../config/colors";
import TextInput from "../components/TextInput";

export default () => {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput placeholder="Password" secureTextEntry />
        <Text>or</Text>
        <TouchableOpacity style={styles.googleButton}>
          <AntDesign name="google" size={24} color="white" />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  googleButtonText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
});
