import { useContext } from "react";

import { AuthProviderContext } from "@/providers/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};
