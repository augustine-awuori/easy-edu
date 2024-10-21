import client, { getFailedResponse, processResponse } from "./client";

const endpoint = "/categories";

const getAllDepartments = async () => {
  try {
    return processResponse(await client.get(endpoint));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { getAllDepartments };
