import { toast } from "sonner";

import { usePostUsersLogin } from "@/api/endpoints/users/users";
import { PostUsersLogin200 } from "@/api/model";

type UseLoginMutationArgs = {
  onSuccess: (response: PostUsersLogin200) => void;
};

export const useLoginMutation = ({ onSuccess }: UseLoginMutationArgs) => {
  return usePostUsersLogin({
    mutation: {
      onError(error) {
        toast.error(error?.error);
      },
      onSuccess,
    },
  });
};
