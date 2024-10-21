import React from "react";

import { DepartmentContext } from "../contexts";

const useDepartments = () => {
  const context = React.useContext(DepartmentContext);

  return context;
};

export default useDepartments;
