import { server$ } from "@builder.io/qwik-city";
import type { insert__comments, commentProps } from "backend/src/db/query";
import {
  getCommentsByPostSlug as dbGetComment,
  createComment as dbCreateComment,
  updateComment as dbUpdateComment,
  deleteComment as dbDeleteComment,
} from "backend/src/db/query";

export const getComment = server$(async (post_id: string) => {
  return await dbGetComment.execute({ post_id });
});

export const createComment = server$(async (props: insert__comments) => {
  return await dbCreateComment(props);
});

export const updateComment = server$(async (data: commentProps) => {
  return await dbUpdateComment(data);
});

export const deleteComment = server$(async (comment_id: string) => {
  return await dbDeleteComment(comment_id);
});
