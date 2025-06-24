import { createFileRoute, redirect } from "@tanstack/react-router";

import { deleteToken } from "@/utils/auth";

export const Route = createFileRoute("/logout")({
  beforeLoad: () => {
    deleteToken();

    throw redirect({
      to: "/login",
      replace: true,
    });
  },
  component: () => <div>Logout</div>,
});
