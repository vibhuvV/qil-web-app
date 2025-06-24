import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { pdfjs } from "react-pdf";

import ThemeProvider from "@/providers/ThemeProvider";
import { router } from "@/lib/router";
import queryClient from "@/lib/queryClient";
import { Toaster } from "@/components/ui/sonner";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider storageKey="test-maker-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster closeButton richColors theme="light" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
