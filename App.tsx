import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import { authTokenKey, processResponse } from "./app/api/client";
import { Course } from "./app/hooks/useCourses";
import { Department, fetchDepartments } from "./app/hooks/useDepartments";
import { DepartmentContext, UserContext } from "./app/contexts";
import { useCourses, useUser } from "./app/hooks";
import { User } from "./app/hooks/useUser";
import auth from "./app/api/auth";
import CoursesContext from "./app/contexts/CoursesContext";
import usersApi from "./app/api/users";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User>();
  const { googleUser } = useUser();
  const { fetchCourses } = useCourses();

  useEffect(() => {
    async function initDepartments() {
      setDepartments(await fetchDepartments());
    }

    async function initCourses() {
      setCourses(await fetchCourses());
    }

    initCourses();
    initDepartments();
  }, []);

  useEffect(() => {
    async function quickAuth() {
      if (!googleUser) return;
      const { displayName: name, email, photoURL: profileImage } = googleUser;
      if (!email || !name || !profileImage) return;
      const res = await usersApi.quickAuth({ email, name, profileImage });
      if (!res) return Toast.error("Couldn't extend your session");

      const { ok } = processResponse(res);
      if (!ok) return Toast.error("Couldn't extend your session");

      auth.loginWithJwt(res.headers[authTokenKey]);
      const user = auth.getCurrentUser();
      if (user) setUser(user);
    }

    async function authUser() {
      if (user) return;

      const cachedUser = auth.getCurrentUser();

      cachedUser ? setUser(cachedUser) : quickAuth();
    }

    authUser();
  }, [user, googleUser]);

  return (
    <UserContext.Provider value={{ setUser, user }}>
      <DepartmentContext.Provider value={{ departments, setDepartments }}>
        <CoursesContext.Provider value={{ courses, setCourses }}>
          <NavigationContainer theme={navigationTheme}>
            <ToastManager />
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </CoursesContext.Provider>
      </DepartmentContext.Provider>
    </UserContext.Provider>
  );
}
