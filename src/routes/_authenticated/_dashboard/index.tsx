import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/")({
  beforeLoad: () => {
    throw redirect({
      to: "/xray/lab",
    });
  },
});
