import { Card } from "@/components/Card";
import { Pagination } from "@/components/Pagination";
import { toAbsoluteUrl } from "@/lib/urls";
import type { TitleGridResponse } from "@/types/title-grid.response";
import { useLoaderData, useSearch } from "@tanstack/react-router";

function TitleGridPage({ from }: { from: string }) {
  const {
    count,
    results: { title, items },
    next,
  } = useLoaderData({ from }) as TitleGridResponse;
  const { page } = useSearch({ from });
  const totalPages = next === null ? page : Math.ceil(count / items.length);

  return (
    <div className="min-h-screen bg-background p-10" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 md:px-6 mb-10">
        <div className="mb-8">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">{count} مورد یافت شد</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card
              item={{ ...item, poster_url: toAbsoluteUrl(item.poster_url) }}
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

export { TitleGridPage };
