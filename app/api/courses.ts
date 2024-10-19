import { AxiosResponse } from "axios";

import { CourseInfo } from "../screens/CourseEditScreen";
import client from "./client";

const endpoint = "/courses";

export type DataError = { error: string };

export type ResponseError = {
  response: {
    data: DataError;
  };
};

export interface Response {
  ok: boolean;
  data: unknown;
  problem: string;
}

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

export const processResponse = ({ data, status }: AxiosResponse) => {
  const response: Response = {
    ok: false,
    data: [],
    problem: "",
  };

  if (status >= 200 && status < 300) {
    response.ok = true;
    response.data = data;
  } else
    response.problem = (response.data as DataError).error || "Unknown Error";

  return response;
};

export default { addCourse };
