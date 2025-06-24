import { BASE_APP_LOCAL_STORAGE_KEY } from "@/constants/app";
import { InvalidLocalStorageKey } from "@/exceptions/localStorage";

const getLocalStorageKey = (key: string) =>
  `${BASE_APP_LOCAL_STORAGE_KEY}-${key}`;

export const setItemInLocalStorage = <T = unknown>(key: string, data: T) => {
  window.localStorage.setItem(getLocalStorageKey(key), JSON.stringify(data));
};

export const getItemFromLocalStorage = <T = unknown>(
  key: string,
  parse = true,
): T => {
  const localStorageData = window.localStorage.getItem(getLocalStorageKey(key));

  if (!localStorageData) {
    throw new InvalidLocalStorageKey();
  }

  return parse ? JSON.parse(localStorageData) : localStorageData;
};

export const removeItemFromLocalStorage = (key: string) => {
  window.localStorage.removeItem(getLocalStorageKey(key));
};
