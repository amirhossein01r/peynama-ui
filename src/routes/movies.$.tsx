import { toAbsoluteUrl } from "@/lib/urls";
import { RouteComponent } from "@/pages/movies.$";
import type { Movie } from "@/types/movie";
import { createFileRoute, redirect } from "@tanstack/react-router";

const Route = createFileRoute("/movies/$")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const res = await fetch(toAbsoluteUrl(`/api/v1/movies/${params._splat}`));
    console.log(toAbsoluteUrl(`/api/v1/movies/${params._splat}`));

    if (!res.ok) {
      throw new Error("Failed to fetch movie");
    }

    const data = await res.json();

    if (data?.canonical_route) {
      throw redirect({
        to: data.canonical_route,
        replace: true,
      });
    }

    const movie: Movie = data;
    movie.poster_url = toAbsoluteUrl(movie.poster_url);
    movie.backdrop_url = toAbsoluteUrl(movie.backdrop_url);
    return movie;
  },
});

export { Route };
