import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ToastManager from "toastify-react-native";

import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import { Course } from "./app/hooks/useCourses";
import { Department, fetchDepartments } from "./app/hooks/useDepartments";
import { DepartmentContext, UserContext } from "./app/contexts";
import { useCourses, useUser } from "./app/hooks";
import { User } from "./app/hooks/useUser";
import auth, { quickAuth } from "./app/api/auth";
import CoursesContext from "./app/contexts/CoursesContext";

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
    async function authUser() {
      if (user) return;

      const cachedUser = auth.getCurrentUser() || (await quickAuth(googleUser));

      if (cachedUser) setUser(cachedUser);
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
