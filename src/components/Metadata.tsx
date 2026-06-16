import type { MetadataGroupData, MetadataItem } from "@/types/metadata";

function MetadataGroup({ title, items }: MetadataGroupData) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="text-zinc-500">{title}</div>
      {items.map((item) => (
        <MetadataBadge item={item} />
      ))}
    </div>
  );
}

function MetadataBadge({ item }: { item: MetadataItem }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-lg border border-zinc-800/60 px-3 py-1.5 text-sm text-zinc-300 transition-all hover:text-white bg-zinc-100/2  ">
      {item.name}
    </button>
  );
}

export { MetadataGroup, MetadataBadge };
