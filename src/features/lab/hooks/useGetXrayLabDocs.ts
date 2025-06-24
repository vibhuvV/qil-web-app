import { useGetXrayLab } from "@/api/endpoints/xray/xray";

type UseGetXrayLabDocsArgs = {
  moduleId?: string;
  title?: string;
  pageNo?: number;
  pageSize?: number;
};

export const useGetXrayLabDocs = ({
  moduleId,
  title,
  pageNo,
  pageSize,
}: UseGetXrayLabDocsArgs) => {
  return useGetXrayLab(
    {
      ...(moduleId && { module_id: moduleId }),
      ...(title && { title }),
      ...(pageNo && { page_no: pageNo }),
      ...(pageSize && { page_size: pageSize }),
    },
    {
      query: {
        placeholderData: (prevData) => prevData,
      },
    },
  );
};
