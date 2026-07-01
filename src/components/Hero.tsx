import type { Movie } from "@/types/movie";
import { mapMovieToMetadata } from "@/lib/metadata.mapper";
import { MetadataGroup } from "./Metadata";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { TitlePoster } from "@/components/TitlePoster";
import { TitleTrackingForm } from "@/components/TitleTrackingForm";
import type { TitleTracking, TitleTrackingStatus } from "@/types/title";

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

type Payload = {
  status: TitleTrackingStatus;
  rating?: number;
};

function Hero({ movie, tracking }: { movie: Movie; tracking: TitleTracking }) {
  const metadataGroups = mapMovieToMetadata(movie);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const [tracker, setTracker] = useState<TitleTracking | null>(tracking);
  const hasData = !!tracker;

  const onSave = (status: TitleTrackingStatus, rating: number) => {
    const payload: Payload = {
      status,
    };

    if (status !== "plan_to_watch") {
      payload.rating = rating;
    }

    api.post(`/api/v1/titles/${movie.id}/tracking/`, payload);
    setTracker({
      tracked: true,
      status: payload.status,
      rating: payload.rating ?? null,
    });
    setOpen(false);
  };

  const onDelete = () => {
    api.delete(`/api/v1/titles/${movie.id}/tracking/`);
    setTracker(null);
    setOpen(false);
  };

  return (
    <>
      <section
        className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden -top-14"
        dir="rtl"
      >
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
            <TitlePoster
              title={movie}
              hasData={hasData}
              open={open}
              setOpen={setOpen}
            >
              <TitleTrackingForm
                tracker={tracker}
                onSave={onSave}
                onDelete={onDelete}
              />
            </TitlePoster>

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
                  <MetadataGroup
                    title={group.title}
                    items={group.items}
                    type={group.type}
                  />
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
