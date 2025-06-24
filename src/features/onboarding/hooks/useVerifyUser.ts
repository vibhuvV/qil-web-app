import { useGetUsersVerifyUser } from "@/api/endpoints/users/users";

type UseVerifyUserQueryArgs = {
  token: string;
};

export const useVerifyUserQuery = ({ token }: UseVerifyUserQueryArgs) => {
  return useGetUsersVerifyUser(
    {
      token,
    },
    {
      query: {
        retry: false,
      },
    },
  );
};
