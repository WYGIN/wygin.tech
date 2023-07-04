import { server$ } from "@builder.io/qwik-city";
import type { insert__pages } from "backend/src/db/query";
import {
  getPages as dbGetPages,
  getPageBySlug,
  createPage as dbCreatePage,
  updatePage as dbUpdatePage,
  deletePage as dbDeletePage,
} from "backend/src/db/query";

export const getPages = server$(async () => {
  return await dbGetPages;
});

export const getPage = server$(async (slug: string) => {
  return await getPageBySlug.execute({ slug });
});

export const createPage = server$(async (props: insert__pages) => {
  return await dbCreatePage(props);
});

export const updatePage = server$(async (data: insert__pages) => {
  return await dbUpdatePage(data);
});

export const deletePage = server$(async (slug: string) => {
  return await dbDeletePage(slug);
});
