import type { CardProps } from "@/types/card";
import { Link } from "@tanstack/react-router";

function Card({ item }: CardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-border/50
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
      "
    >
      <Link to="/movies/$" params={{ _splat: item.url }}>
        <div className="relative aspect-2/3 overflow-hidden">
          <img
            src={item.poster_url}
            alt={item.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            style={{
              viewTransitionName: `poster-${item.id}`,
            }}
          />

          <div
            className="
              absolute
              inset-0
              bg-linear-to-t
              from-background
              via-background/20
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
              bg-primary/8
            "
          />
        </div>

        <div className="p-4">
          <h2
            className="
              line-clamp-2
              text-sm
              font-medium
              text-foreground
              transition-colors
              group-hover:text-primary
            "
          >
            {item.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}

export { Card };
