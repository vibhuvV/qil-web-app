import { createContext } from "react";

import { AppUser } from "@/types/user";

type AuthProviderState = {
  user: AppUser;
};

const initialState: AuthProviderState = {
  user: null!,
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);
