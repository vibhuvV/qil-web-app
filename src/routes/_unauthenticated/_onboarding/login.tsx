import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import LoginForm from "@/features/onboarding/components/LoginForm";

const loginSearchSchema = z.object({
  redirectTo: z.string().optional(),
});

export const Route = createFileRoute("/_unauthenticated/_onboarding/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: Login,
});

function Login() {
  const { redirectTo } = Route.useSearch();

  return (
    <div className="flex relative items-center justify-center py-12">
      <Link className="absolute top-3 right-5 underline" to="/">
        Back to home
      </Link>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <LoginForm redirectTo={redirectTo} />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" to="/register">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
