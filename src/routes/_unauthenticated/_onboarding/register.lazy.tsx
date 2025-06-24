import { Link, createLazyFileRoute } from "@tanstack/react-router";

import RegisterForm from "@/features/onboarding/components/RegisterForm";

export const Route = createLazyFileRoute(
  "/_unauthenticated/_onboarding/register",
)({
  component: Register,
});

function Register() {
  return (
    <div className="flex relative items-center justify-center py-12">
      <Link className="absolute top-3 right-5 underline" to="/">
        Back to home
      </Link>
      <div className="mx-auto grid w-[380px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to create to your account
          </p>
        </div>
        <RegisterForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
