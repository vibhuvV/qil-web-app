export type AppResponseSuccess<T = unknown> = {
  result: true;
  data: T;
  message?: string;
};

export type AppResponseError<E = string> = {
  result: false;
  error: E;
};

export type AppResponse<T = unknown, E = string> =
  | AppResponseSuccess<T>
  | AppResponseError<E>;
