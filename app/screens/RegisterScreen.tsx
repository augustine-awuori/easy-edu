import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import Button from "../components/Button";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useUser from "../hooks/useUser";

const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

type Info = Yup.InferType<typeof schema>;

interface Props {
  navigation: NavigationProp<any>;
}

function RegisterScreen({ navigation }: Props) {
  const { user, loginWithGoogle } = useUser();

  useEffect(() => {
    if (user) navigation.navigate(routes.HOME);
  }, [user]);

  const handleRegistrationWithGoogle = async () => {
    await loginWithGoogle();
  };

  const navigateToLoginScreen = () => navigation.navigate("login");

  const handleSubmit = (info: Info) => {
    console.log(info);
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values as Info)}
        validationSchema={schema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
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
        <SubmitButton title="Register" />
        <View style={styles.divider} />
        <Button
          title="Sign up with Google"
          onPress={handleRegistrationWithGoogle}
          color="secondary"
        />
        <Text onPress={navigateToLoginScreen} style={styles.text}>
          Have an account?
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
  divider: {
    marginVertical: 5,
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

export default RegisterScreen;
