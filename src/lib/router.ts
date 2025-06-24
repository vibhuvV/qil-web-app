import { createRouter } from "@tanstack/react-router";
import nprogress from "nprogress";

import { routeTree } from "@/routeTree.gen";
import queryClient from "@/lib/queryClient";

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Subscribing nprogress
router.subscribe("onBeforeNavigate", () => {
  nprogress.start();
});
router.subscribe("onResolved", () => {
  nprogress.done();
});

export { router };
