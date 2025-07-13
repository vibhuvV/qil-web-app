import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  ClockIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { z } from "zod";
import { Document, Page } from "react-pdf";
import { FormEvent, useMemo, useState } from "react";

import { TypographyH6, TypographySmall } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getXrayModulesQueryOptions,
  useGetXrayLabDocModules,
} from "@/features/lab/hooks/useGetXrayLabDocModules";
import { useGetXrayLabDocs } from "@/features/lab/hooks/useGetXrayLabDocs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeader from "@/components/DashboardHeader";
import Pagination from "@/components/Pagination";
import { cn } from "@/utils/style";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { S3_BASE_URL } from "@/constants/app";

const xrayLabSchema = z.object({
  module: z.string().optional(),
  search: z.string().optional(),
  pageNo: z.number().optional(),
});

export const Route = createFileRoute("/_authenticated/_dashboard/xray/lab")({
  component: XrayLabComponent,
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(
      getXrayModulesQueryOptions(),
    );

    context.queryClient.setQueryData(
      getXrayModulesQueryOptions().queryKey,
      data,
    );

    return data;
  },
  validateSearch: (search) => xrayLabSchema.parse(search),
});

function XrayLabComponent() {
  const routerData = Route.useLoaderData();
  const { module = " ", search = "", pageNo = 1 } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [numPages, setNumPages] = useState<number>(0);

  const xrayLabDocModules = useGetXrayLabDocModules({
    query: {
      initialData: routerData,
    },
  });
  const xrayLabDocs = useGetXrayLabDocs({
    moduleId: module.trim(),
    title: search,
    pageNo,
    pageSize: 10,
  });
  const totalPages = useMemo(
    () => xrayLabDocs.data?.page_count ?? 1,
    [xrayLabDocs.data?.page_count],
  );

  const handleModuleChange = (value: string) => {
    navigate({ search: (prev) => ({ ...prev, module: value }) });
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleSearchClear = () => {
    navigate({
      search: (prev) => ({ ...prev, search: undefined }),
    });
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchText = formData.get("search") as string;

    if (searchText?.trim()) {
      navigate({
        search: (prev) => ({ ...prev, search: searchText }),
      });
    } else {
      navigate({
        search: (prev) => ({ ...prev, search: undefined }),
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 justify-between relative">
      <div className="pt-4 bg-secondary sticky top-0 z-10">
        <DashboardHeader
          icon={ReaderIcon}
          rightSide={
            <>
              <Select
                disabled={xrayLabDocModules.isLoading}
                value={module}
                onValueChange={handleModuleChange}
              >
                <SelectTrigger className="max-w-48 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All Modules</SelectItem>
                  {xrayLabDocModules.data?.data.map((module) => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {module.display_text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <form
                className="w-full max-w-[250px] focus-within:max-w-[300px] transition-[max-width]"
                onSubmit={handleSearch}
              >
                <Input
                  containerClassName="bg-background w-full"
                  defaultValue={search}
                  endAdornment={
                    <Button
                      className={cn("h-auto hover:bg-secondary/50", {
                        hidden: !search,
                      })}
                      size="sm"
                      type="reset"
                      variant="ghost"
                      onClick={handleSearchClear}
                    >
                      <Cross2Icon className="h-4 w-4" />
                    </Button>
                  }
                  name="search"
                  placeholder="Search docs..."
                  startAdornment={
                    <MagnifyingGlassIcon className="h-6 w-6 self-center ml-2 text-muted-foreground" />
                  }
                />
              </form>
            </>
          }
          title="X-Ray Lab"
        />
      </div>
      <div className="flex-1 grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {xrayLabDocs.isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="max-w-xs w-full">
              <CardContent className="p-0 border-b">
                <div className="overflow-hidden">
                  <Skeleton className="aspect-[16/9] rounded-none" />
                </div>
              </CardContent>
              <CardFooter className="p-3 flex-col items-start gap-4">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-6 w-[250px]" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-[200px]" />
                  </div>
                </div>
                <Skeleton className="h-3 mt-2 w-28" />
              </CardFooter>
            </Card>
          ))}
        {xrayLabDocs.data?.data.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <CardContent className="p-0 border-b">
              <div className="overflow-hidden">
                <img
                  alt={doc.title}
                  className={
                    "h-auto w-auto object-cover transition-all hover:scale-105 aspect-[16/9]"
                  }
                  height={150}
                  src={`${S3_BASE_URL}/${doc.thumbnail}`}
                  width={150}
                />
              </div>
            </CardContent>
            <CardFooter className="p-3 flex-col items-start gap-4">
              <div className="space-y-2">
                <Badge variant="outline">
                  {xrayLabDocModules.data?.data.find(
                    (module) => module.id === doc.module,
                  )?.display_text ?? "Unknown"}
                </Badge>
                <TypographyH6 className="font-medium">{doc.title}</TypographyH6>
                <TypographySmall className="text-muted-foreground">
                  Complete guide to basic cardiology concepts and terminology
                </TypographySmall>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <TypographySmall>2 days ago</TypographySmall>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost-primary">View</Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 border-0 overflow-hidden h-full max-w-[calc(100vw-50px)] max-h-[calc(100vh-50px)] flex flex-col gap-0  bg-accent">
                    <DialogHeader className="p-4 bg-background border-b">
                      <DialogTitle className="font-normal">
                        {doc.title}
                      </DialogTitle>
                    </DialogHeader>
                    <Document
                      className="space-y-6 flex-1 flex flex-col items-center overflow-auto"
                      file={`${S3_BASE_URL}/${doc.file}`}
                      loading={
                        <div className="space-y-2">
                          <Skeleton className="aspect-[16/9] rounded-none w-[900px]" />
                          <Skeleton className="aspect-[16/9] rounded-none w-[900px]" />
                        </div>
                      }
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      {Array.from({ length: numPages }, (_, pageNo) => (
                        <Page
                          key={pageNo}
                          loading={
                            <Skeleton className="aspect-[16/9] rounded-none w-[900px]" />
                          }
                          pageNumber={pageNo + 1}
                          scale={1.25}
                        />
                      ))}
                    </Document>
                    <DialogFooter className="p-3 bg-background border-t">
                      <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                      </DialogClose>
                      <Button asChild>
                        <a
                          download={doc.file}
                          href={`${S3_BASE_URL}/${doc.file}`}
                          target="_blank"
                        >
                          Download
                        </a>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="py-4 bg-secondary sticky bottom-0">
        <Pagination
          className="justify-end"
          currentPage={pageNo}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
