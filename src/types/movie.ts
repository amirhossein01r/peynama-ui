import type { Genre, Keyword, ProductionCountry, SpokenLanguage } from "./base";

interface Movie {
  id: number;
  title: string;
  overview_fa: string;
  poster_url: string;
  backdrop_url: string;
  genres: Genre[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  keywords: Keyword[];
}

export type { Movie };
