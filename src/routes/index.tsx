import { RouteComponent } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/")({
  component: RouteComponent,
});

export { Route };
