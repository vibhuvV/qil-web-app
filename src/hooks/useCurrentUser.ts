import {
  getGetUsersQueryOptions,
  useGetUsers,
} from "@/api/endpoints/users/users";

export const getCurrentUserOptions = () => getGetUsersQueryOptions();

export const useGetCurrentUserQuery = () =>
  useGetUsers({ query: { staleTime: Infinity } });
