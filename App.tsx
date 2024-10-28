import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import { authTokenKey, processResponse } from "./app/api/client";
import { Course } from "./app/hooks/useCourses";
import { Department, fetchDepartments } from "./app/hooks/useDepartments";
import { DepartmentContext } from "./app/contexts";
import { useCourses, useUser } from "./app/hooks";
import auth from "./app/api/auth";
import CourseContext from "./app/contexts/CoursesContext";
import usersApi from "./app/api/users";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const { user, setUser } = useUser();
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

  return (
    <DepartmentContext.Provider value={{ departments, setDepartments }}>
      <CourseContext.Provider value={{ courses, setCourses }}>
        <NavigationContainer theme={navigationTheme}>
          <ToastManager />
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </CourseContext.Provider>
    </DepartmentContext.Provider>
  );
}
