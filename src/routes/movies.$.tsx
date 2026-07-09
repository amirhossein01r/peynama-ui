import { createTitleLoader, fetchTracking } from "@/lib/title-loader";
import { RouteComponent } from "@/pages/movies.$";
import type { Movie } from "@/types/movie";
import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/movies/$")({
  component: RouteComponent,
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  loader: async ({ params }) => {
    const title = await createTitleLoader<Movie>("movies")({
      params: params as { _splat: string },
    });

    return { title, tracking: await fetchTracking(title.id) };
  },
});

export { Route };
