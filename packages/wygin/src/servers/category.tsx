import { server$ } from "@builder.io/qwik-city";
import type { insert__categories } from "backend/src/db/query";
import {
  getCategory as dbGetCategory,
  createCategory as dbCreateCategory,
  updateCategory as dbUpdateCategory,
  deleteCategory as dbDeleteCategory,
  followCategory as dbFollowCategory,
  unfollowCategory as dbUnfollowCategory,
} from "backend/src/db/query";

export const getCategory = server$(
  async (category1: string, category2: string) => {
    return await dbGetCategory.execute({ category1, category2 });
  }
);

export const createCategory = server$(async (props: insert__categories) => {
  return await dbCreateCategory(props);
});

export const updateCategory = server$(async (data: insert__categories) => {
  return await dbUpdateCategory(data);
});

export const deleteCategory = server$(async (id: string) => {
  return await dbDeleteCategory(id);
});

export const followCategory = server$(
  async (category_id: string, user_id: string) => {
    return await dbFollowCategory.execute({ category_id, user_id });
  }
);

export const unfollowCategory = server$(
  async (category_id: string, user_id: string) => {
    return await dbUnfollowCategory.execute({ category_id, user_id });
  }
);
