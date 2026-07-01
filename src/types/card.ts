import type { TitleItem } from "./title";

type CardProps = {
  item: TitleItem;
};

interface CardCarouselProps {
  title: string;
  items: TitleItem[];
  linkTo: string;
}

export type { CardProps, CardCarouselProps };
