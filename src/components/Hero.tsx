import type { Movie } from "@/types/movie";
import { mapMovieToMetadata } from "@/lib/metadata.mapper";
import { MetadataGroup } from "./Metadata";
import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function Hero({ movie }: { movie: Movie }) {
  const metadataGroups = mapMovieToMetadata(movie);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <section className="relative overflow-hidden" dir="rtl">
        {/* backdrop */}
        <div className="absolute inset-0">
          {isDesktop && (
            <img
              src={movie.backdrop_url}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/10" />
          <div className="absolute inset-0 lg:bg-linear-to-l from-background/80 via-background/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-8 mt-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            {/* poster */}
            <div className="w-fit shrink-0 overflow-hidden rounded-3xl border border-white/10 mx-auto">
              <img src={movie.poster_url} className="w-90 aspect-2/3" />
            </div>

            {/* content */}
            <div className="max-w-4xl flex flex-col gap-8 mt-4 w-full">
              <div className="flex items-center" dir="ltr">
                <h1 className="text-6xl font-black tracking-tight">
                  {movie.title}
                </h1>
              </div>

              {/* overview */}
              <bdi className="text-lg leading-8 text-zinc-300 border-s-2 ps-4">
                {movie.overview_fa}
              </bdi>

              {/* metadata */}
              <div className="space-y-4" dir="rtl">
                {metadataGroups.map((group) => (
                  <MetadataGroup title={group.title} items={group.items} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { Hero };
