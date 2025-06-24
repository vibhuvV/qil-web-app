import { toast } from "sonner";

import { usePutUsers } from "@/api/endpoints/users/users";
import queryClient from "@/lib/queryClient";
import { getCurrentUserOptions } from "@/hooks/useCurrentUser";

type UseUpdateProfileMutationArgs = {
  onSuccess: () => void;
};

export const useUpdateProfileMutation = ({
  onSuccess,
}: UseUpdateProfileMutationArgs) => {
  return usePutUsers({
    mutation: {
      onError(error) {
        toast.error(error?.error);
      },
      onSuccess(response) {
        toast.success(response?.message);
        queryClient.invalidateQueries({
          queryKey: getCurrentUserOptions().queryKey,
        });
        onSuccess();
      },
    },
  });
};
