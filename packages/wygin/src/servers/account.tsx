import { server$ } from "@builder.io/qwik-city";
import type {
  accountProps,
  update__accounts,
  insert__accounts,
} from "backend/src/db/query";
import {
  getAccounts as dbGetAccounts,
  getAccountById,
  createAccount as dbCreateAccount,
  updateAccount as dbUpdateAccount,
  deleteAccountWithProviderAccountId,
} from "backend/src/db/query";

export const getAccounts = server$(
  async (props: Pick<insert__accounts, "user_id" | "provider">) => {
    return await dbGetAccounts.execute({ ...props });
  }
);

export const getAccount = server$(
  async ({
    provider,
    provider_account_id,
  }: {
    provider: string;
    provider_account_id: string;
  }) => {
    return await getAccountById.execute({ provider, provider_account_id });
  }
);

export const createAccount = server$(async (props: accountProps) => {
  return await dbCreateAccount(props);
});

export const updateAccount = server$(async (data: update__accounts) => {
  return await dbUpdateAccount(data);
});

export const deleteAccount = server$(
  async ({ provider_account_id }: { provider_account_id: string }) => {
    return await deleteAccountWithProviderAccountId(provider_account_id);
  }
);
