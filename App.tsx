import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

import { AppNavigator, AuthNavigator, navigationTheme } from "./app/navigation";
import { Department, getDepartments } from "./app/services/data";
import { DepartmentContext } from "./app/contexts";
import { useUser } from "./app/hooks";
import departmentsService from "./app/api/departments";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function initDepartments() {
      const result = await fetchDepartments();
      setDepartments(result || getDepartments());
    }

    initDepartments();
  }, []);

  async function fetchDepartments(): Promise<Department[] | undefined> {
    const res = await departmentsService.getAllDepartments();

    if (res.ok) {
      return res.data as Department[];
    } else Toast.error("Error fetching departments.");
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
