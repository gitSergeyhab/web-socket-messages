import { ApiError } from "../../types/api";

export const getErrorMessage = (e: ApiError): string => {
  if (e.errors?.length) return e.errors.map(({ detail }) => detail).join(", ");
  return e.message || "Ошибка загрузки данных";
};

export const handledRequest =
  <T, ARGS>(
    requestFn: (...args: ARGS[]) => Promise<T>,
    title: string,
    returnValue: T
  ) =>
  async (...args: Parameters<typeof requestFn>) => {
    return requestFn(...args).catch((e) => {
      console.error(title, getErrorMessage(e as ApiError));
      return returnValue;
    });
  };
