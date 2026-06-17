interface MetadataItem {
  name: string;
  slug: string;
}

interface MetadataGroupData {
  title: string;
  type: "genres" | "languages" | "countries" | "keywords";
  items: MetadataItem[];
}

export type { MetadataItem, MetadataGroupData };
