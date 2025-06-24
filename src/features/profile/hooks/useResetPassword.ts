import { toast } from "sonner";

import { usePostUsersResetPassword } from "@/api/endpoints/users/users";

type UseResetPasswordMutationArgs = {
  onSuccess: () => void;
};

export const useResetPasswordMutation = ({
  onSuccess,
}: UseResetPasswordMutationArgs) => {
  return usePostUsersResetPassword({
    mutation: {
      onError(error) {
        toast.error(error?.error);
      },
      onSuccess(response) {
        toast.success(response?.message);
        onSuccess();
      },
    },
  });
};
