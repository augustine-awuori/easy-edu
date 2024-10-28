import { NewLesson } from "../components/LessonUploadForm";
import client, { processResponse } from "./client";

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

export default { createLesson };
