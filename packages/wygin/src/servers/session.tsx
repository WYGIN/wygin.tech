import { server$ } from "@builder.io/qwik-city";
import type { insert__sessions } from "backend/src/db/query";
import {
  getSession as dbGetSession,
  createSession as dbCreateSession,
  updateSession as dbUpdateSession,
  deleteSession as dbDeleteSession,
} from "backend/src/db/query";

export const getSession = server$(async (token: string) => {
  return await dbGetSession(token);
});

export const createSession = server$(async (props: insert__sessions) => {
  return await dbCreateSession(props);
});

export const updateSession = server$(async (data: insert__sessions) => {
  return await dbUpdateSession(data);
});

export const deleteSession = server$(async (session_token: string) => {
  return await dbDeleteSession(session_token);
});
