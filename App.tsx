import { NavigationContainer } from "@react-navigation/native";
import ToastManager from "toastify-react-native";

import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import { useUser } from "./app/hooks";

export default function App() {
  const { user } = useUser();

  return (
    <NavigationContainer theme={navigationTheme}>
      <ToastManager />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
