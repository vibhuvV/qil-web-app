import ky, { HTTPError } from "ky";
import {
  Input,
  NormalizedOptions,
  Options,
} from "node_modules/ky/distribution/types/options";

import { BASE_APP_URL } from "@/constants/app";
import {
  deleteToken,
  getAccessTokenFromApi,
  getAuthorizationHeader,
  getRefreshToken,
  setToken,
} from "@/utils/auth";
import { AppResponseError } from "@/types/response";

const handleUnauthorisedError = () => {
  deleteToken();
  window.location.replace("/login");
};

const createHttpErrorResponse = <E = unknown>(
  error: E,
  status: number,
  request: Request,
  options: NormalizedOptions,
) =>
  new HTTPError(
    new Response(
      JSON.stringify({
        result: false,
        error,
      }),
      { status },
    ),
    request,
    options,
  );

const httpClient = ky.create({
  prefixUrl: BASE_APP_URL,
  throwHttpErrors: true,
  redirect: "follow",
  retry: {
    limit: 1,
    statusCodes: [401, 403, 408, 413, 429, 500, 502, 503, 504],
    methods: ["get", "put", "post", "head", "delete", "options", "trace"],
  },
  hooks: {
    beforeRequest: [
      ({ headers }) => {
        const authorizationHeader = getAuthorizationHeader();

        if (authorizationHeader) {
          headers.set("Authorization", authorizationHeader);
        }
      },
    ],
    beforeRetry: [
      async ({ request, error }) => {
        if (error instanceof HTTPError && error.response.status === 401) {
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            handleUnauthorisedError();
            throw error;
          }

          try {
            const response = await getAccessTokenFromApi(refreshToken);

            setToken(response.data.access, response.data.refresh);
            const authorizationHeader = getAuthorizationHeader(
              response.data.access,
            );

            if (authorizationHeader) {
              request.headers.set("Authorization", authorizationHeader);
            }
          } catch {
            handleUnauthorisedError();
            throw error;
          }
        }
      },
    ],
    beforeError: [
      async (error) => {
        const { response, options, request } = error;
        const errorMessage = "Oops something went wrong. Please try again.";
        let errorResponse = createHttpErrorResponse(
          errorMessage,
          500,
          request,
          options,
        );

        if (response) {
          switch (response.status) {
            case 401:
              errorResponse = new HTTPError(
                new Response(
                  JSON.stringify({
                    result: false,
                    error: "You are unauthorised to perform this operation",
                  }),
                  { status: response.status },
                ),
                request,
                options,
              );
          }

          try {
            const res = (await response.json()) as AppResponseError;

            errorResponse = createHttpErrorResponse(
              res.error ?? errorMessage,
              response.status,
              request,
              options,
            );
          } catch {
            errorResponse = createHttpErrorResponse(
              errorMessage,
              response.status,
              request,
              options,
            );
          }
        }

        return errorResponse;
      },
    ],
  },
});

export const restClient = async <T>(
  {
    url,
    data,
    params,
    ...options
  }: {
    url: Input;
    data?: Options["json"];
    params?: Options["searchParams"];
  } & Options,
  kyOptions?: Omit<Options, "json" | "searchParams" | "method">,
): Promise<T> => {
  const isUrlStartingWithSlash = url.toString().startsWith("/");

  if (isUrlStartingWithSlash) {
    url = url.toString().slice(1);
  }

  try {
    const response = await httpClient(url, {
      ...options,
      ...kyOptions,
      json: data,
      searchParams: params,
    });

    return response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw await error.response.json();
    }

    throw error;
  }
};

export default httpClient;

// afterResponse: [
//   async (request, options, response) => {
//     if (response.status === 400) {
//       const refreshToken = getRefreshToken();

//       if (!refreshToken) {
//         return new Response(
//           JSON.stringify({ result: true, message: "Hello" }),
//           { status: 200 },
//         );
//       }

//       try {
//         const response = await getAccessTokenFromApi(refreshToken);
//         const authorizationHeader = getAuthorizationHeader(
//           response.data.access,
//         );

//         if (authorizationHeader) {
//           request.headers.set("Authorization", authorizationHeader);
//         } else {
//           throw new Error("no header found");
//         }

//         return ky(request, options);
//       } catch {
//         return response;
//       }
//     }
//   },
// ],
