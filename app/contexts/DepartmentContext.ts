import { createContext } from "react";

import { Department } from "../services/data";

export interface ContextValue {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
}

export const DepartmentContext = createContext<ContextValue>({
  departments: [],
  setDepartments: () => {},
});

DepartmentContext.displayName = "Department Context";

export default DepartmentContext;