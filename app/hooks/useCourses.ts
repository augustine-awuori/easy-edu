import React from "react";

import { Course } from "../services/data";
import CourseContext from "../contexts/CoursesContext";
import coursesApi from "../api/courses";

export async function fetchCourses(): Promise<Course[]> {
  const res = await coursesApi.getAllCourses();

  return res.ok ? (res.data as Course[]) : [];
}

const useCourses = () => React.useContext(CourseContext);

export default useCourses;
