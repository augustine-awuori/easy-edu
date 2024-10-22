import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import { authTokenKey, processResponse } from "./app/api/client";
import { Department, getDepartments } from "./app/services/data";
import { DepartmentContext } from "./app/contexts";
import { useUser } from "./app/hooks";
import auth from "./app/api/auth";
import departmentsApi from "./app/api/departments";
import usersApi from "./app/api/users";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    async function initDepartments() {
      const fetched = await fetchDepartments();

      setDepartments(fetched?.length ? fetched : getDepartments());
    }

    initDepartments();
  }, []);

  useEffect(() => {
    async function quickAuth() {
      if (!user) return;
      const { displayName: name, email, photoURL: profileImage } = user;
      if (!email || !name || !profileImage) return;
      const res = await usersApi.quickAuth({ email, name, profileImage });
      if (!res) return Toast.error("Couldn't extend your session");

      const { ok } = processResponse(res);
      ok
        ? auth.loginWithJwt(res.headers[authTokenKey])
        : Toast.error("Couldn't extend your session");
    }

    async function authUser() {
      const cachedUser = auth.getCurrentUser();
      if (!user && !cachedUser) return;

      if (cachedUser && !user) return setUser(cachedUser);

      quickAuth();
    }

    authUser();
  }, [user]);

  async function fetchDepartments(): Promise<Department[] | undefined> {
    const res = await departmentsApi.getAllDepartments();

    if (res.ok) return res.data as Department[];

    Toast.error("Error fetching departments.");
  }

  return (
    <DepartmentContext.Provider value={{ departments, setDepartments }}>
      <NavigationContainer theme={navigationTheme}>
        <ToastManager />
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </DepartmentContext.Provider>
  );
}
