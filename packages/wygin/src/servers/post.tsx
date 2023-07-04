import { server$ } from "@builder.io/qwik-city";
import type { insert__posts } from "backend/src/db/query";
import {
  getPosts as dbGetPosts,
  getPost as dbGetPost,
  createPost as dbCreatePost,
  updatePost as dbUpdatePost,
  deletePost as dbDeletePost,
} from "backend/src/db/query";

export const getPosts = server$(async () => {
  return await dbGetPosts;
});

export const getPost = server$(
  async (category1: string, category2: string, slug: string) => {
    return await dbGetPost.execute({ category1, category2, slug });
  }
);

export const createPost = server$(async (props: insert__posts) => {
  return await dbCreatePost(props);
});

export const updatePost = server$(async (data: insert__posts) => {
  return await dbUpdatePost(data);
});

export const deletePost = server$(async (categoryId: string, slug: string) => {
  return await dbDeletePost(slug, categoryId);
});
