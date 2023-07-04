import { server$ } from "@builder.io/qwik-city";
import type { insert__headers } from "backend/src/db/query";
import {
  getHeaderById,
  createHeader as dbCreateHeader,
  updateHeader as dbUpdateHeader,
  deleteHeader as dbDeleteHeader,
} from "backend/src/db/query";

export const getHeader = server$(async (id: string) => {
  return await getHeaderById.execute({ id });
});

export const createHeader = server$(async (props: insert__headers) => {
  return await dbCreateHeader(props);
});

export const updateHeader = server$(async (data: insert__headers) => {
  return await dbUpdateHeader(data);
});

export const deleteHeader = server$(async (id: string) => {
  return await dbDeleteHeader(id);
});
