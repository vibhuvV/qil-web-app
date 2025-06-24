import {
  createLazyFileRoute,
  Link,
  Navigate,
  useLocation,
} from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute(
  "/_unauthenticated/_onboarding/register-success",
)({
  component: RegisterSuccess,
});

function RegisterSuccess() {
  const location = useLocation();

  if (!location.state.email || !location.state.username) {
    return <Navigate replace resetScroll to="/register" />;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto text-center max-w-[480px] space-y-6">
        <h1 className="text-3xl font-bold">Register Success 🎉</h1>
        <p className="text-balance">
          Hi {location.state.username}, one last step before logging into the
          platform. You'll have to verify your email using the link that we have
          send you on the email that you provided 😊
        </p>
        <div className="space-y-2">
          <p className="text-sm">
            If you haven't received any email please click below to resend
          </p>
          <Button size="sm">Resend</Button>
        </div>
        <p className="text-sm">
          Already verified email?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
