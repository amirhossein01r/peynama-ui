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

export type { ProductionCountry, SpokenLanguage, Genre, Keyword };
