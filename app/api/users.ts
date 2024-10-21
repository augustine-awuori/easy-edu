import client, { getFailedResponse, processResponse } from "./client";

const endpoint = "/people";

const quickAuth = async (info: {
  email: string;
  profileImage: string;
  name: string;
}) => {
  try {
    return await client.post(`${endpoint}/quick`, info);
  } catch (error) {
    console.error(error);
  }
};

export default { quickAuth };
