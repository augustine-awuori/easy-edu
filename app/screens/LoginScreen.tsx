import React, { useEffect } from "react";
import { StyleSheet, Image, ImageBackground, Text } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import { NavigationProp } from "@react-navigation/native";
import Button from "../components/Button";
import colors from "../config/colors";
import useUser from "../hooks/useUser";
import routes from "../navigation/routes";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

type Info = Yup.InferType<typeof schema>;

interface Props {
  navigation: NavigationProp<any>;
}

function LoginScreen({ navigation }: Props) {
  const { user, loginWithEmailAndPassword, loginWithGoogle } = useUser();

  useEffect(() => {
    if (user) navigation.navigate(routes.HOME);
  }, [user]);

  const handleLogin = async ({ email, password }: Info) =>
    await loginWithEmailAndPassword(email, password);

  const handleRegistrationWithGoogle = async () => {
    await loginWithGoogle();
  };

  const navigateToLoginScreen = () => navigation.navigate("register");

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values as Info)}
        validationSchema={schema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
        <Button
          title="Sign in with Google"
          onPress={handleRegistrationWithGoogle}
          color="secondary"
        />
        <Text onPress={navigateToLoginScreen} style={styles.text}>
          Don't have an account?
        </Text>
      </Form>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 15,
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    color: colors.secondary,
  },
});

export default LoginScreen;
