import ky from "ky";

import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "./localStorage";

import { BASE_APP_URL } from "@/constants/app";

type LocaStorageToken = {
  access: string;
  refresh: string;
};

export const getAuthorizationHeader = (newToken?: string) => {
  const accessToken = newToken ?? getAccessToken();

  return accessToken ? `Bearer ${accessToken}` : undefined;
};

export const getAccessTokenFromApi = async (refreshToken: string) => {
  return ky("users/refresh-token/", {
    method: "post",
    prefixUrl: BASE_APP_URL,
    headers: {
      "Content-Type": "application/json",
    },
    json: {
      refresh: refreshToken,
    },
  }).json<{ result: boolean; data: { access: string; refresh: string } }>();
};

export const getToken = () => {
  try {
    const token = getItemFromLocalStorage<LocaStorageToken>("token");

    return token;
  } catch {
    return null;
  }
};

export const setToken = (access: string, refresh: string) => {
  setItemInLocalStorage<LocaStorageToken>("token", {
    access,
    refresh,
  });
};

export const deleteToken = () => {
  removeItemFromLocalStorage("token");
};

export const getAccessToken = () => {
  const token = getToken();

  return token?.access;
};

export const getRefreshToken = () => {
  const token = getToken();

  return token?.refresh;
};
