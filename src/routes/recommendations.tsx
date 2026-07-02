import { authGuard } from "@/lib/auth";
import { paginationLoaderDeps, paginationSearch } from "@/lib/pagination";
import { fetchQuery } from "@/lib/query";
import { TitleGridPage } from "@/pages/title-grid";
import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/recommendations")({
  validateSearch: paginationSearch,
  beforeLoad: ({ context }) => authGuard(context.queryClient),
  loaderDeps: paginationLoaderDeps,
  loader: async ({ deps, context: { queryClient } }) => {
    const { page } = deps;

    return await queryClient.ensureQueryData({
      queryKey: ["recommendations", page],
      queryFn: fetchQuery(`/api/v1/recommendations?page=${page}`),
    });
  },

  component: () => <TitleGridPage from="/recommendations" />,
});

export { Route };
