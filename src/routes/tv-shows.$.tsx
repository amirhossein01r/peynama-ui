import { createTitleLoader, fetchTracking } from "@/lib/title-loader";
import { RouteComponent } from "@/pages/tv-shows.$";
import type { TVShow } from "@/types/tv-show";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv-shows/$")({
  component: RouteComponent,
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  loader: async ({ params }) => {
    const title = await createTitleLoader<TVShow>("tv-shows")({
      params: params as { _splat: string },
    });

    return { title, tracking: await fetchTracking(title.id) };
  },
});
