import { server$ } from "@builder.io/qwik-city";
import type { insert__blogs } from "backend/src/db/query";
import {
  getBlogs as dbGetBlogs,
  getBlogBySlug,
  createBlog as dbCreateBlog,
  updateBlog as dbUpdateBlog,
  deleteBlog as dbDeleteBlog,
} from "backend/src/db/query";

export const getBlogs = server$(async () => {
  return await dbGetBlogs;
});

export const getBlog = server$(async (slug: string) => {
  return await getBlogBySlug.execute({ slug });
});

export const createBlog = server$(async (props: insert__blogs) => {
  return await dbCreateBlog(props);
});

export const updateBlog = server$(async (data: insert__blogs) => {
  return await dbUpdateBlog(data);
});

export const deleteBlog = server$(async (slug: string) => {
  return await dbDeleteBlog(slug);
});
