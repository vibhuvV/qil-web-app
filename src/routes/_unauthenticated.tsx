import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { getToken } from "@/utils/auth";

export const Route = createFileRoute("/_unauthenticated")({
  beforeLoad: () => {
    if (getToken()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Outlet,
});
