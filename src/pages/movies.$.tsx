import { Hero } from "@/components/Hero";
import { useLoaderData } from "@tanstack/react-router";

function RouteComponent() {
  const data = useLoaderData({ from: "/movies/$" });
  return (
    <main className="min-h-screen bg-background">
      <Hero movie={data} />
    </main>
  );
}

export { RouteComponent };
