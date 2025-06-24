import { toast } from "sonner";

import { usePostUsersRegister } from "@/api/endpoints/users/users";

type UseRegisterMutationArgs = {
  onSuccess: () => void;
};

export const useRegisterMutation = ({ onSuccess }: UseRegisterMutationArgs) => {
  return usePostUsersRegister({
    mutation: {
      onError(error) {
        toast.error(error?.error);
      },
      onSuccess(response) {
        toast.success(response?.message ?? "Registration Success");
        onSuccess();
      },
    },
  });
};
