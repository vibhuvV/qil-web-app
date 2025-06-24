import { AppResponse, AppResponseError } from "@/types/response";

export function isAppResponseError<T, E>(
  response: AppResponse<T, E>,
): response is AppResponseError<E> {
  return !response.result;
}
