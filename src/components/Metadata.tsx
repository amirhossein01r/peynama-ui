import type { MetadataGroupData, MetadataItem } from "@/types/metadata";
import { Link } from "@tanstack/react-router";

function MetadataGroup({ title, items, type }: MetadataGroupData) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="text-zinc-500">{title}</div>
      {items.map((item) => (
        <MetadataBadge item={item} type={type} />
      ))}
    </div>
  );
}

function MetadataBadge({ item, type }: { item: MetadataItem; type: string }) {
  return (
    <Link
      to="/$type/$slug"
      params={{
        type,
        slug: item.slug,
      }}
      search={{ page: 1 }}
      className="inline-flex items-center gap-1 rounded-lg border border-zinc-800/60 px-3 py-1.5 text-sm text-zinc-300 transition-all hover:text-primary bg-zinc-100/2  "
    >
      {item.name}
    </Link>
  );
}

export { MetadataGroup, MetadataBadge };
