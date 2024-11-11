import React, { useState } from "react";

import { CoursesContext } from "../contexts";
import { Department } from "./useDepartments";
import { Lecturer } from "../services/data";
import { Lesson } from "../screens/CourseScreen";
import coursesApi from "../api/courses";
import lessonsApi from "../api/lessons";

export interface Course {
  _id: string;
  title: string;
  department: Department;
  images: string[];
  lecturer: Lecturer;
}

const useCourses = () => {
  const context = React.useContext(CoursesContext);
  const [loading, setLoading] = useState(true);

  async function fetchCourses(): Promise<Course[]> {
    const res = await coursesApi.getAllCourses();
    setLoading(false);

    return res.ok ? (res.data as Course[]) : [];
  }

  async function fetchCourseLessons(courseId: string): Promise<Lesson[]> {
    const res = await lessonsApi.getLessons(courseId);

    return res.ok ? (res.data as Lesson[]) : [];
  }

  async function completeCourseLesson(lessonId: string) {}

  return {
    ...context,
    completeCourseLesson,
    loading,
    fetchCourses,
    fetchCourseLessons,
  };
};

export default useCourses;
