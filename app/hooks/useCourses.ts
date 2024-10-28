import React, { useState } from "react";

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

const useCourses = () => {
  const context = React.useContext(CourseContext);
  const [loading, setLoading] = useState(false);

  async function fetchCourses(): Promise<Course[]> {
    setLoading(true);
    const res = await coursesApi.getAllCourses();
    setLoading(false);

    return res.ok ? (res.data as Course[]) : [];
  }

  return { ...context, loading, fetchCourses };
};

export default useCourses;
