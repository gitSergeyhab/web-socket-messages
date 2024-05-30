import { ApiError } from "../../types/api";

export const getErrorMessage = (e: ApiError): string => {
  if (typeof e === "string") return e;
  if (e.errors?.length) return e.errors.map(({ detail }) => detail).join(", ");
  return e.message || "request data error";
};
