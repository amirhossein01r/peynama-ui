interface MovieItem {
  id: number | string;
  title: string;
  url: string;
  poster_url: string;
}

interface ResultsData {
  title: string;
  items: MovieItem[];
}

interface MetadataResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultsData;
}

export type { MetadataResponse };
