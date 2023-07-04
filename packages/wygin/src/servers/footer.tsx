import { server$ } from "@builder.io/qwik-city";
import type { insert__footers } from "backend/src/db/query";
import {
  getFooterById,
  createFooter as dbCreateFooter,
  updateFooter as dbUpdateFooter,
  deleteFooter as dbDeleteFooter,
} from "backend/src/db/query";

export const getFooter = server$(async (id: string) => {
  return await getFooterById.execute({ id });
});

export const createFooter = server$(async (props: insert__footers) => {
  return await dbCreateFooter(props);
});

export const updateFooter = server$(async (data: insert__footers) => {
  return await dbUpdateFooter(data);
});

export const deleteFooter = server$(async (id: string) => {
  return await dbDeleteFooter(id);
});
