import type {
  Genre,
  SpokenLanguage,
  ProductionCountry,
  Keyword,
} from "@/types/base";
import type { MetadataItem } from "@/types/metadata";

const toGenreMetadata = (items: Genre[]): MetadataItem[] =>
  items.map((i) => ({
    name: i.name_fa,
    slug: i.slug,
  }));

const toLanguageMetadata = (items: SpokenLanguage[]): MetadataItem[] =>
  items.map((i) => ({
    name: i.name_fa,
    slug: i.iso_639_1,
  }));

const toCountryMetadata = (items: ProductionCountry[]): MetadataItem[] =>
  items.map((i) => ({
    name: i.name_fa,
    slug: i.iso_3166_1,
  }));

const toKeywordMetadata = (items: Keyword[]): MetadataItem[] =>
  items.map((i) => ({
    name: i.name_fa,
    slug: i.slug,
  }));

export {
  toGenreMetadata,
  toLanguageMetadata,
  toCountryMetadata,
  toKeywordMetadata,
};
