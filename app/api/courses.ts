import { CourseInfo } from "../screens/CourseEditScreen";
import cache from "../utility/cache";
import client, { getFailedResponse, processResponse, Response } from "./client";

const endpoint = "/courses";

export interface NewCourse extends CourseInfo {
  department: string;
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

export const getAllCourses = async (): Promise<Response> => {
  try {
    const res = processResponse(await client.get(endpoint));

    if (res.ok) cache.store(endpoint, res.data);

    return res.ok ? res : { data: res.data, ok: true, problem: "" };
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { addCourse, getAllCourses };
