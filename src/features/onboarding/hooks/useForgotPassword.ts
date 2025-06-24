import { toast } from "sonner";

import { usePostUsersForgotPassword } from "@/api/endpoints/users/users";

type UseForgotPasswordMutationArgs = {
  onSuccess: () => void;
};

export const useForgotPasswordMutation = ({
  onSuccess,
}: UseForgotPasswordMutationArgs) => {
  return usePostUsersForgotPassword({
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
