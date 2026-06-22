import { createTitleLoader } from "@/lib/title-loader";
import { RouteComponent } from "@/pages/movies.$";
import type { Movie } from "@/types/movie";
import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/movies/$")({
  component: RouteComponent,
  loader: createTitleLoader<Movie>("movies"),
});

export { Route };
