import { NewLesson } from "../components/LessonUploadForm";
import client, { getFailedResponse, processResponse } from "./client";

const endpoint = "/lessons";

interface NewLessonWithCourse extends NewLesson {
  course: string;
}

const createLesson = async (
  lesson: NewLessonWithCourse,
  onUploadProgress: (progress: number) => void
) =>
  processResponse(
    await client.post(endpoint, lesson, {
      onUploadProgress: (progress) =>
        progress.total && onUploadProgress(progress.loaded / progress.total),
    })
  );

const getLessons = async (courseId: string) => {
  try {
    return processResponse(await client.get(`${endpoint}/${courseId}`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { createLesson, getLessons };
