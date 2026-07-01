import { paginationLoaderDeps, paginationSearch } from "@/lib/pagination";
import { fetchQuery } from "@/lib/query";
import { TitleGridPage } from "@/pages/title-grid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/library/$slug")({
  validateSearch: paginationSearch,
  loaderDeps: paginationLoaderDeps,
  loader: async ({ params, deps, context: { queryClient } }) => {
    const { slug } = params;
    const { page } = deps;

    return await queryClient.ensureQueryData({
      queryKey: ["library", slug, page],
      queryFn: fetchQuery(`/api/v1/library/${slug}?page=${page}`),
    });
  },

  component: () => <TitleGridPage from="/library/$slug" />,
});
