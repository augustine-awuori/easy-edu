import { CourseInfo } from "../screens/CourseEditScreen";
import client, { processResponse } from "./client";

const endpoint = "/courses";

export interface NewCourse extends CourseInfo {
  category: string;
}

export const addCourse = async (
  course: NewCourse,
  onUploadProgress: (progress: number) => void
) =>
  processResponse(
    await client.post(endpoint, course, {
      onUploadProgress: (progress) =>
        progress.total && onUploadProgress(progress.loaded / progress.total),
    })
  );

export default { addCourse };
