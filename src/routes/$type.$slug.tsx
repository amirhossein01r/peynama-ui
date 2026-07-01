import { paginationLoaderDeps, paginationSearch } from "@/lib/pagination";
import { fetchQuery } from "@/lib/query";
import { TitleGridPage } from "@/pages/title-grid";
import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/$type/$slug")({
  validateSearch: paginationSearch,
  loaderDeps: paginationLoaderDeps,
  loader: async ({ params, deps, context: { queryClient } }) => {
    const { type, slug } = params;
    const { page } = deps;

    return await queryClient.ensureQueryData({
      queryKey: ["metadata", type, slug, page],
      queryFn: fetchQuery(`/api/v1/${type}/${slug}?page=${page}`),
    });
  },

  component: () => <TitleGridPage from="/$type/$slug" />,
});

export { Route };
