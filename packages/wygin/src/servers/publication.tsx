import { server$ } from "@builder.io/qwik-city";
import type {
  insert__publications,
  insert__publication_followers,
  insert__publication_roles,
} from "backend/src/db/query";
import {
  getPublications as dbGetPublications,
  getPublication as dbGetPublication,
  createPublication as dbCreatePublication,
  updatePublication as dbUpdatePublication,
  deletePublication as dbDeletePublication,
  followPublication as dbFollowPublication,
  unfollowPublication as dbUnfollowPublication,
  addUserToPublication as dbAddUserToPublication,
  removeUserToPublication,
} from "backend/src/db/query";

export const getPublications = server$(async () => {
  return await dbGetPublications;
});

export const getPublication = server$(async (name: string) => {
  return await dbGetPublication.execute({ name });
});

export const createPublication = server$(
  async (props: insert__publications) => {
    return await dbCreatePublication(props);
  }
);

export const updatePublication = server$(async (data: insert__publications) => {
  return await dbUpdatePublication(data);
});

export const deletePublication = server$(async (name: string) => {
  return await dbDeletePublication(name);
});

export const followPublication = server$(
  async (data: insert__publication_followers) => {
    return await dbFollowPublication(data);
  }
);

export const unfollowPublication = server$(
  async (data: insert__publication_followers) => {
    return await dbUnfollowPublication(data);
  }
);

export const addUserToPublication = server$(
  async (data: insert__publication_roles) => {
    return await dbAddUserToPublication(data);
  }
);

export const removeUserFromPublication = server$(
  async (data: insert__publication_roles) => {
    return await removeUserToPublication(data);
  }
);
