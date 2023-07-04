import { server$ } from "@builder.io/qwik-city";
import type { insert__bookmarks } from "backend/src/db/query";
import {
  getBookmarks as dbGetBookmarks,
  createBookmark as dbCreateBookmark,
  deleteBookmark as dbDeleteBookmark,
} from "backend/src/db/query";

export const getBookmarks = server$(async (user_id: string) => {
  return await dbGetBookmarks.execute({ user_id });
});

export const createBookmark = server$(async (props: insert__bookmarks) => {
  return await dbCreateBookmark(props);
});

export const deleteBookmark = server$(async (data: insert__bookmarks) => {
  return await dbDeleteBookmark(data);
});
