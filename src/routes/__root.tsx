import { Navbar } from "@/components/Navbar";
import { NotFoundComponent } from "@/pages/404";
import { createRootRoute, Outlet } from "@tanstack/react-router";
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

const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundComponent,
});

export { Route };
