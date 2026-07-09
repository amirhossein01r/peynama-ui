import { Hero } from "@/components/Hero";
import { useLoaderData } from "@tanstack/react-router";

function RouteComponent() {
  const { title, tracking } = useLoaderData({ from: "/tv-shows/$" });
  return <Hero key={title.id} movie={title} tracking={tracking} />;
}

export { RouteComponent };
