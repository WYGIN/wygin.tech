import { server$ } from "@builder.io/qwik-city";
import type { insert__nav_items } from "backend/src/db/query";
import {
  getNavItemById,
  createNavItem as dbCreateNavItem,
  updateNavItem as dbUpdateNavItem,
  deleteNavItem as dbDeleteNavItem,
} from "backend/src/db/query";

export const getNavItem = server$(async (id: string) => {
  return await getNavItemById.execute({ id });
});

export const createNavItem = server$(async (props: insert__nav_items) => {
  return await dbCreateNavItem(props);
});

export const updateNavItem = server$(async (data: insert__nav_items) => {
  return await dbUpdateNavItem(data);
});

export const deleteNavItem = server$(async (id: string) => {
  return await dbDeleteNavItem(id);
});
