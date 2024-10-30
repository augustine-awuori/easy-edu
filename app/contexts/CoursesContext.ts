import { createContext } from "react";

import { Course } from "../hooks/useCourses";

export interface ContextValue {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}

export const CoursesContext = createContext<ContextValue>({
  courses: [],
  setCourses: () => {},
});

CoursesContext.displayName = "Course Context";

export default CoursesContext;
