import { createFileRoute, Navigate } from "@tanstack/react-router";
import { z } from "zod";

import { Spinner } from "@/components/ui/spinner";
import { useVerifyUserQuery } from "@/features/onboarding/hooks/useVerifyUser";

const verifyUserSearchSchema = z.object({
  token: z.string(),
});

export const Route = createFileRoute(
  "/_unauthenticated/_onboarding/verify-user",
)({
  validateSearch: (search) => verifyUserSearchSchema.parse(search),
  component: VerifyUser,
});

function VerifyUser() {
  const { token } = Route.useSearch();
  const verifyUserQuery = useVerifyUserQuery({ token });

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto text-center max-w-[530px] space-y-6">
        {verifyUserQuery.isLoading && !verifyUserQuery.error && (
          <>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl font-bold">Verifying Your Email</h1>
              <Spinner />
            </div>
            <p className="text-balance">
              Please wait. We are verifying your email. We appretiate your
              patience 😊
            </p>
          </>
        )}
        {!verifyUserQuery.isLoading && verifyUserQuery.error && (
          <>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl font-bold">
                Oops something went wrong 😕
              </h1>
            </div>
            <div className="space-y-2">
              <p className="text-balance">
                Unfortunately we were unable to verify your email.
              </p>
              <p className="text-base">
                <strong>{verifyUserQuery.error.error}</strong>
              </p>
            </div>
          </>
        )}
        {!verifyUserQuery.isLoading && !verifyUserQuery.error && (
          <Navigate to="/login" />
        )}
      </div>
    </div>
  );
}
