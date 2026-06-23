import { RouteComponent } from "@/pages/login";
import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/login")({
  component: RouteComponent,
});

export { Route };
