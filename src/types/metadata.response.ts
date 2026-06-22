interface Item {
  id: number | string;
  type: "movie" | "tv_show";
  title: string;
  poster_url: string;
}

interface ResultsData {
  title: string;
  items: Item[];
}

interface MetadataResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultsData;
}

export type { Item, MetadataResponse };
