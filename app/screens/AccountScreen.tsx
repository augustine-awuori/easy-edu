import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ListItem, ListItemSeparator } from "../components/lists";
import auth from "../api/auth";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useUser from "../hooks/useUser";

type MenuItem = {
  icon: {
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    backgroundColor: string;
  };
  title: string;
  targetScreen: string;
};

const menuItems: MenuItem[] = [
  {
    title: "My Lessons",
    targetScreen: routes.COURSES,
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

interface Props {
  navigation: NavigationProp<any>;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout, setUser } = useUser();

  const logOut = async () => {
    await logout();
    auth.logout();
    setUser(undefined);
    navigation.navigate(routes.HOME_NAVIGATOR);
  };

  if (!user) {
    navigation.navigate(routes.WELCOME);
    return null;
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user?.name || "No name"}
          subTitle={user?.email || "No email"}
          image={user?.profileImage || require("../assets/background.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={logOut}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
