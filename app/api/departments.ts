import cache from "../utility/cache";
import client, { getFailedResponse, processResponse, Response } from "./client";

const endpoint = "/categories";
const cacheKey = "departments";

const getAllDepartments = async (): Promise<Response> => {
  const result = cache.retrieve(cacheKey);
  const successResponse: Response = { ok: true, data: result, problem: "" };

  try {
    const res = processResponse(await client.get(endpoint));

    if (res.ok) cache.store(cacheKey, res.data);
    else {
      if (result) return successResponse;
    }

    return res;
  } catch (error) {
    return result ? successResponse : getFailedResponse(error);
  }
};

export default { getAllDepartments };
