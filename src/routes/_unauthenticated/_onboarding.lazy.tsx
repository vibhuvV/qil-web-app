import { Outlet, createLazyFileRoute } from "@tanstack/react-router";

import OnboardingLayout from "@/layouts/OnboardingLayout";

export const Route = createLazyFileRoute("/_unauthenticated/_onboarding")({
  component: () => (
    <OnboardingLayout>
      <Outlet />
    </OnboardingLayout>
  ),
});
