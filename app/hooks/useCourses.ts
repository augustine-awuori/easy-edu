import React from "react";

import { Department } from "./useDepartments";
import { Lecturer } from "../services/data";
import CourseContext from "../contexts/CoursesContext";
import coursesApi from "../api/courses";

export interface Course {
  _id: string;
  title: string;
  department: Department;
  images: string[];
  lecturer: Lecturer;
}

export async function fetchCourses(): Promise<Course[]> {
  const res = await coursesApi.getAllCourses();

  return res.ok ? (res.data as Course[]) : [];
}

const useCourses = () => React.useContext(CourseContext);

export default useCourses;
