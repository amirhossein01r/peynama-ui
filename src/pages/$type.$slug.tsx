import { Card } from "@/components/Card";
import { Pagination } from "@/components/Pagination";
import { toAbsoluteUrl } from "@/lib/urls";
import { useLoaderData, useSearch } from "@tanstack/react-router";

function RouteComponent() {
  const data = useLoaderData({ from: "/$type/$slug" });
  const { page } = useSearch({ from: "/$type/$slug" });
  const totalPages = Math.ceil(data.count / data.results.items.length);

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-7xl px-4md:px-6 mb-10">
        <div className="mb-8" dir="rtl">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {data.results.title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {data.count} مورد یافت شد
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {data.results.items.map((movie) => (
            <Card
              item={{
                ...movie,
                poster_url: toAbsoluteUrl(movie.poster_url),
              }}
            />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

export { RouteComponent };
