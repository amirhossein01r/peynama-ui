interface ProductionCountry {
  iso_3166_1: string;
  name_fa: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name_fa: string;
}

interface Genre {
  id: number;
  name_fa: string;
  slug: string;
}

interface Keyword {
  id: number;
  name_fa: string;
  slug: string;
}

interface Title {
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

export type { ProductionCountry, SpokenLanguage, Genre, Keyword, Title };
