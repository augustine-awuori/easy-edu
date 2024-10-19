import axios from "axios";

import auth from "./auth";

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

export default apiClient;
