import api from "@/lib/api";
import { authGuard } from "@/lib/auth";
import { RouteComponent } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => authGuard(context.queryClient),
  loader: async ({ context: { queryClient } }) => {
    const homeSnippets = await queryClient.fetchQuery({
      queryKey: ["home-snippets"],
      queryFn: async () => {
        const res = await api.get("/api/v1/home-snippets/");
        return res.data;
      },
    });

    return { homeSnippets };
  },
});

export { Route };
