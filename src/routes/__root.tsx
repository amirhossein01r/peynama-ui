import { Navbar } from "@/components/Navbar";
import { NotFoundComponent } from "@/pages/404";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen pt-14 bg-background">
      <Outlet />
    </main>
    <TanStackRouterDevtools />
  </>
);

const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
  notFoundComponent: NotFoundComponent,
});

export { Route };
