import React from "react";

import { DepartmentContext } from "../contexts";

export interface Department {
  _id: string;
  label: string;
}

const useDepartments = () => {
  const context = React.useContext(DepartmentContext);

  return context;
};

export default useDepartments;
