import z from "zod";

const paginationSearch = z.object({
  page: z.coerce
    .number()
    .int()
    .catch(1)
    .transform((v) => Math.max(1, v)),
});

const paginationLoaderDeps = ({ search }: { search: { page: number } }) => ({
  page: search.page,
});

export { paginationSearch, paginationLoaderDeps };
