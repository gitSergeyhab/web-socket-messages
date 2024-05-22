import { ApiError } from "../../types/api";
import { logger } from "../utils/logger";

export const getErrorMessage = (e: ApiError): string => {
  if (e.errors?.length) return e.errors.map(({ detail }) => detail).join(", ");
  return e.message || "request data error";
};

export const handledRequest =
  <T, ARGS>(
    requestFn: (...args: ARGS[]) => Promise<T>,
    title: string,
    returnValue: T
  ) =>
  async (...args: Parameters<typeof requestFn>) => {
    return requestFn(...args).catch((e) => {
      const errorMessage = title + ": " + getErrorMessage(e as ApiError);
      logger.error(errorMessage);
      return returnValue;
    });
  };
