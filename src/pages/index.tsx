import { CardCarousel } from "@/components/CardCarousel";
import type { HomeSnippetsResponse } from "@/types/home-snippets.response";
import { useLoaderData } from "@tanstack/react-router";

function RouteComponent() {
  const { homeSnippets } = useLoaderData({ from: "/" }) as {
    homeSnippets: HomeSnippetsResponse;
  };
  return (
    <div>
      <CardCarousel
        title="پیشنهادی‌ها"
        items={homeSnippets.recommendations ?? []}
        linkTo="/recommendations"
      />
      <CardCarousel
        title="شاید ببینم"
        items={homeSnippets.planToWatch ?? []}
        linkTo="/library/plan-to-watch"
      />
      <CardCarousel
        title="دیده‌شده‌ها"
        items={homeSnippets.watched ?? []}
        linkTo="/library/watched"
      />
      <CardCarousel
        title="رهاشده‌ها"
        items={homeSnippets.dropped ?? []}
        linkTo="/library/dropped"
      />
    </div>
  );
}

export { RouteComponent };
