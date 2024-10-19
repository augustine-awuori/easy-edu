import { CourseInfo } from "../screens/CourseEditScreen";
import client from "./client";

const endpoint = "/courses";

export interface NewCourse extends CourseInfo {
  category: string;
}

export const addCourse = (
  course: NewCourse,
  onUploadProgress: (progress: number) => void
) =>
  client.post(endpoint, course, {
    onUploadProgress: (progress) =>
      progress.total && onUploadProgress(progress.loaded / progress.total),
  });

export default { addCourse };
