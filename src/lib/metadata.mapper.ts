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
    { title: "ژانرها", items: toGenreMetadata(movie.genres) },
    { title: "زبان‌ها", items: toLanguageMetadata(movie.spoken_languages) },
    { title: "کشورها", items: toCountryMetadata(movie.production_countries) },
    { title: "واژگان کلیدی", items: toKeywordMetadata(movie.keywords) },
  ];
}

export { mapMovieToMetadata };
