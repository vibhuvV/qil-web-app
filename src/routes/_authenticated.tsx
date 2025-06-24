import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getCurrentUserOptions } from "@/hooks/useCurrentUser";
import { deleteToken, getToken } from "@/utils/auth";
import AuthProvider from "@/providers/AuthProvider";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location, context }) => {
    if (!getToken()) {
      throw redirect({
        to: "/login",
        search: {
          redirectTo: location.pathname + location.searchStr,
        },
      });
    }

    try {
      await context.queryClient.ensureQueryData(getCurrentUserOptions());
    } catch {
      deleteToken();
      throw redirect({
        to: "/login",
        search: {
          redirectTo: location.pathname + location.searchStr,
        },
      });
    }
  },
  pendingComponent: () => "Loading.....",
  component: Authenticated,
});

function Authenticated() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
