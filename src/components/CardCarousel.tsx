import { ChevronLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "@tanstack/react-router";
import { toAbsoluteUrl } from "@/lib/urls";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import type { CardCarouselProps } from "@/types/card";

function CardCarousel({ title, items, linkTo }: CardCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () =>
      setCanScroll(api.canScrollNext() || api.canScrollPrev());

    update();
    api.on("select", update);
    api.on("resize", update);

    return () => {
      api.off("select", update);
      api.off("resize", update);
    };
  }, [api]);

  if (items.length === 0) return;

  return (
    <section className="space-y-4 mt-10 px-16 max-w-316 mx-auto" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {items.length === 5 && (
          <Link to={linkTo}>
            <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
              مشاهده بیشتر
              <ChevronLeft className="size-4" />
            </button>
          </Link>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
          loop: true,
        }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="pt-2" dir="ltr">
                <Card
                  item={{
                    ...item,
                    poster_url: toAbsoluteUrl(item.poster_url),
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {canScroll && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </section>
  );
}

export { CardCarousel };
