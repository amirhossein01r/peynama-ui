import { Hero } from "@/components/Hero";
import { useLoaderData } from "@tanstack/react-router";

function RouteComponent() {
  const { title, tracking } = useLoaderData({ from: "/movies/$" });
  return <Hero movie={title} tracking={tracking} />;
}

export { RouteComponent };
