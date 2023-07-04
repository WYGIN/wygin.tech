import { server$ } from "@builder.io/qwik-city";
import type { insert__tags, insert__tag_followers } from "backend/src/db/query";
import {
  getTags as dbGetTags,
  getTag as dbGetTag,
  createTag as dbCreateTag,
  updateTag as dbUpdateTag,
  deleteTag as dbDeleteTag,
  followTag as dbFollowTag,
  unfollowTag as dbUnfollowTag,
} from "backend/src/db/query";

export const getTags = server$(async () => {
  return await dbGetTags;
});

export const getTag = server$(async (tag: string) => {
  return await dbGetTag.execute({ tag });
});

export const createTag = server$(async (props: insert__tags) => {
  return await dbCreateTag(props);
});

export const updateTag = server$(async (data: insert__tags) => {
  return await dbUpdateTag(data);
});

export const deleteTag = server$(async (tag: string) => {
  return await dbDeleteTag(tag);
});

export const followTag = server$(async (data: insert__tag_followers) => {
  return await dbFollowTag(data);
});

export const unfollowTag = server$(async (data: insert__tag_followers) => {
  return await dbUnfollowTag(data);
});
