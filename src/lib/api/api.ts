import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL: process.env.MAIN_SERVER_URL,
  });
  return api;
};

export const request = createApi();
