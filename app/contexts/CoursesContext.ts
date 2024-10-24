import { createContext } from "react";

import { Course } from "../hooks/useCourses";

export interface ContextValue {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}

export const CourseContext = createContext<ContextValue>({
  courses: [],
  setCourses: () => {},
});

CourseContext.displayName = "Course Context";

export default CourseContext;
