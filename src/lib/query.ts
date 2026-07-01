import { isAxiosError } from "axios";
import api from "./api";
import { notFound } from "@tanstack/react-router";

const fetchQuery = (url: string) => () =>
  api
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      if (isAxiosError(err)) throw notFound();
      throw err;
    });

export { fetchQuery };
