import axios, { AxiosResponse } from "axios";

import auth from "./auth";

export interface Response {
  ok: boolean;
  data: unknown;
  problem: string;
}

export type DataError = { error: string };

export type ResponseError = {
  response: {
    data: DataError;
  };
};

const emptyResponse: Response = {
  ok: false,
  data: [],
  problem: "",
};

export const authTokenKey = "x-auth-token";

const apiClient = axios.create({
  baseURL: "https://campus-hub-api.onrender.com/api",
});

apiClient.interceptors.request.use((config) => {
  const authToken = auth.getJwt();

  if (authToken && config.headers) {
    config.headers[authTokenKey] = authToken;
  }

  return config;
});

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

export const getFailedResponse = (error: unknown): Response => ({
  ...emptyResponse,
  problem: (error as ResponseError).response.data.error || "Unknown error",
});

export default apiClient;
