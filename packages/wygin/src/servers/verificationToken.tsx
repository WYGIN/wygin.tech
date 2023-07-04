import { server$ } from "@builder.io/qwik-city";
import type { insert__verification_tokens } from "backend/src/db/query";
import {
  getVerificationToken as dbGetVerificationToken,
  createVerificationToken as dbCreateVerificationToken,
  updateVerificationToken as dbUpdateVerificationToken,
  deleteVerificationToken as dbDeleteVerificationToken,
} from "backend/src/db/query";

export const getVerificationToken = server$(
  async (data: insert__verification_tokens) => {
    return await dbGetVerificationToken(data);
  }
);

export const createVerificationToken = server$(
  async (props: insert__verification_tokens) => {
    return await dbCreateVerificationToken(props);
  }
);

export const updateVerificationToken = server$(
  async (data: insert__verification_tokens) => {
    return await dbUpdateVerificationToken(data);
  }
);

export const deleteVerificationToken = server$(async (data) => {
  return await dbDeleteVerificationToken(data);
});
