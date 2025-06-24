import {
  getGetXrayModulesQueryOptions,
  useGetXrayModules,
} from "@/api/endpoints/xray/xray";

export const getXrayModulesQueryOptions = () => getGetXrayModulesQueryOptions();

export const useGetXrayLabDocModules = useGetXrayModules;
