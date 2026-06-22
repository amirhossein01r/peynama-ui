import { createTitleLoader } from "@/lib/title-loader";
import { RouteComponent } from "@/pages/tv-shows.$";
import type { TVShow } from "@/types/tv-show";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv-shows/$")({
  component: RouteComponent,
  loader: createTitleLoader<TVShow>("tv-shows"),
});
