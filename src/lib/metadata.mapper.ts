import type { Movie } from "@/types/movie";
import type { MetadataGroupData } from "@/types/metadata";
import {
  toCountryMetadata,
  toGenreMetadata,
  toKeywordMetadata,
  toLanguageMetadata,
} from "@/lib/metadata.adapters";

function mapMovieToMetadata(movie: Movie): MetadataGroupData[] {
  return [
    { title: "ژانرها", type: "genres", items: toGenreMetadata(movie.genres) },
    {
      title: "زبان‌ها",
      type: "languages",
      items: toLanguageMetadata(movie.spoken_languages),
    },
    {
      title: "کشورها",
      type: "countries",
      items: toCountryMetadata(movie.production_countries),
    },
    {
      title: "واژگان کلیدی",
      type: "keywords",
      items: toKeywordMetadata(movie.keywords),
    },
  ];
}

export { mapMovieToMetadata };
