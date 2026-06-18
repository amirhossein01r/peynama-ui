import { queryClient } from "@/lib/query-client";
import { toAbsoluteUrl } from "@/lib/urls";
import { RouteComponent } from "@/pages/$type.$slug";
import type { MetadataResponse } from "@/types/metadata.response";

import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";

const Route = createFileRoute("/$type/$slug")({
  validateSearch: z.object({
    page: z.coerce
      .number()
      .int()
      .catch(1)
      .transform((v) => Math.max(1, v)),
  }),

  loaderDeps: ({ search }) => ({
    page: search.page,
  }),

  loader: async ({ params, deps }) => {
    const { type, slug } = params;
    const { page } = deps;

    return await queryClient.ensureQueryData<MetadataResponse>({
      queryKey: ["metadata", type, slug, page],
      queryFn: async () => {
        const url = toAbsoluteUrl(`/api/v1/${type}/${slug}?page=${page}`);

        const res = await fetch(url);

        if (!res.ok) {
          throw notFound();
        }

        return res.json();
      },
    });
  },

  component: RouteComponent,
});

export { Route };
