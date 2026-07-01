import type { TitleItem } from "./title";

interface HomeSnippetsResponse {
  recommendations: TitleItem[];
  planToWatch: TitleItem[];
  watched: TitleItem[];
  dropped: TitleItem[];
}

export type { HomeSnippetsResponse };
