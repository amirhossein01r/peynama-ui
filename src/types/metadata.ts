interface MetadataItem {
  name: string;
  slug: string;
}

interface MetadataGroupData {
  title: string;
  items: MetadataItem[];
}

export type { MetadataItem, MetadataGroupData };
