import { Hero } from "@/components/Hero";
import { useLoaderData } from "@tanstack/react-router";

function RouteComponent() {
  const data = useLoaderData({ from: "/tv-shows/$" });
  return (
    <main className="min-h-screen bg-background">
      <Hero movie={data} />
    </main>
  );
}

export { RouteComponent };
