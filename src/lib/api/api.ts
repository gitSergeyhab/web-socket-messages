import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const createApi = () => {
  const api = axios.create({
    baseURL: process.env.MAIN_SERVER_URL,
  });
  return api;
};

export const request = createApi();
