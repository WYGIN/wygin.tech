import { server$ } from "@builder.io/qwik-city";
import type {
  insert__users,
  insert__user_followers,
} from "backend/src/db/query";
import {
  getUserById,
  getUserByEmail,
  createUser as dbCreateUser,
  updateUserById,
  updateUserByEmail,
  deleteUserById,
  deleteUserByEmail,
  followUser as dbFollowUser,
  unfollowUser as dbUnfollowUser,
} from "backend/src/db/query";

export const getUser = server$(
  async ({ id, email }: { id?: string; email?: string }) => {
    return id != null
      ? await getUserById.execute({ id })
      : await getUserByEmail.execute({ email });
  }
);

export const createUser = server$(async (props: insert__users) => {
  return await dbCreateUser(props);
});

export const updateUser = server$(async (data: insert__users) => {
  return data.id != null
    ? await updateUserById(data)
    : await updateUserByEmail(data);
});

export const deleteUser = server$(
  async ({ id, email }: { id?: string; email?: string }) => {
    return id != null
      ? await deleteUserById(id)
      : await deleteUserByEmail(email!);
  }
);

export const followUser = server$(async (data: insert__user_followers) => {
  return await dbFollowUser(data);
});

export const unfollowUser = server$(async (data: insert__user_followers) => {
  return await dbUnfollowUser(data);
});
