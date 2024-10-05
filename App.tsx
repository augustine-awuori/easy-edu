import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import { useUser } from "./app/hooks";

export default function App() {
  const { user } = useUser();

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
