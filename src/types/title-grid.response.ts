import type { TitleItem } from "./title";

interface ResultsData {
  title: string;
  items: TitleItem[];
}

interface TitleGridResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultsData;
}

export type { TitleGridResponse };
