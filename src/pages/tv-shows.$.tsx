import { Hero } from "@/components/Hero";
import { useLoaderData } from "@tanstack/react-router";

function RouteComponent() {
  const { title, tracking } = useLoaderData({ from: "/tv-shows/$" });
  return (
    <main className="min-h-screen bg-background">
      <Hero movie={title} tracking={tracking} />
    </main>
  );
}

export { RouteComponent };
