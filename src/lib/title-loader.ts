import type { Title } from "@/types/base";
import { toAbsoluteUrl } from "@/lib/urls";
import { notFound, redirect } from "@tanstack/react-router";

function createTitleLoader<T extends Title>(apiPath: string) {
  return async ({ params }: { params: { _splat: string } }) => {
    const res = await fetch(
      toAbsoluteUrl(`/api/v1/${apiPath}/${params._splat}`),
    );

    if (!res.ok) throw notFound();

    const data = await res.json();

    if (data?.canonical_route) {
      throw redirect({ to: data.canonical_route, replace: true });
    }

    const title = data as T;
    title.poster_url = toAbsoluteUrl(title.poster_url);
    title.backdrop_url = toAbsoluteUrl(title.backdrop_url);
    return title;
  };
}

export { createTitleLoader };
