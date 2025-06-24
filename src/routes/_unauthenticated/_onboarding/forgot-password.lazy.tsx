import { createLazyFileRoute, Link } from "@tanstack/react-router";

import ForgotPasswordForm from "@/features/onboarding/components/ForgotPasswordForm";

export const Route = createLazyFileRoute(
  "/_unauthenticated/_onboarding/forgot-password",
)({
  component: ForgotPassword,
});

function ForgotPassword() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password?</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to reset your password
          </p>
        </div>
        <ForgotPasswordForm />
        <div className="mt-4 text-center text-sm">
          Remembered your password?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
