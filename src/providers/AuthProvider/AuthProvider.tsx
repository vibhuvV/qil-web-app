import { Navigate } from "@tanstack/react-router";
import { PropsWithChildren } from "react";

import { useGetCurrentUserQuery } from "@/hooks/useCurrentUser";
import { AuthProviderContext } from "@/providers/AuthProvider/AuthProviderContext";

export default function AuthProvider({ children }: PropsWithChildren) {
  const currentUserQuery = useGetCurrentUserQuery();

  if (!currentUserQuery.isFetching && currentUserQuery.isError) {
    return <Navigate to="/logout" />;
  }

  return (
    <AuthProviderContext.Provider value={{ user: currentUserQuery.data!.data }}>
      {children}
    </AuthProviderContext.Provider>
  );
}
