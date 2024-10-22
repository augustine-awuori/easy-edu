import React from "react";
import { Toast } from "toastify-react-native";

import { DepartmentContext } from "../contexts";
import api from "../api/departments";

export interface Department {
  _id: string;
  label: string;
}

export async function fetchDepartments(): Promise<Department[]> {
  const res = await api.getAllDepartments();

  if (res.ok) return res.data as Department[];
  Toast.error("Error fetching departments.");

  return [];
}

const useDepartments = () => {
  const context = React.useContext(DepartmentContext);

  return context;
};

export default useDepartments;
