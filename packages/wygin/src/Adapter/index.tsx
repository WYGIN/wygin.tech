import {
  getUser as qwikGetUser,
  createUser as qwikCreateUser,
  updateUser as qwikUpdateUser,
  deleteUser as qwikDeleteUser,
} from "~/servers/user";
import {
  getAccount as qwikGetAccount,
  createAccount as qwikCreateAccount,
  deleteAccount as qwikDeleteAccount,
} from "~/servers/account";
import {
  getSession as qwikGetSession,
  createSession as qwikCreateSession,
  updateSession as qwikUpdateSession,
  deleteSession as qwikDeleteSession,
} from "~/servers/session";
import {
  getVerificationToken as qwikGetVToken,
  createVerificationToken as qwikCreateVToken,
  deleteVerificationToken as qwikDeleteVToken,
} from "~/servers/verificationToken";

import type { Adapter as AuthAdapter } from "@auth/core/adapters";

export const Adapter = (): AuthAdapter => {
  return {
    async createUser(user) {
      await qwikCreateUser(user as any);
      return (await qwikGetUser({ email: user.email })) as any;
    },
    async getUser(id) {
      return (await qwikGetUser({ id })) as any;
    },
    async getUserByEmail(email) {
      return qwikGetUser({ email }) as any;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const res = (await qwikGetAccount({
        provider,
        provider_account_id: providerAccountId,
      })) as any;
      return res.user as any;
    },
    async updateUser(user) {
      await qwikUpdateUser(user as any);
      return (await qwikGetUser({ id: user.id })) as any;
    },
    async deleteUser(userId) {
      return (await qwikDeleteUser({ id: userId })) as any;
    },
    async linkAccount(account) {
      await qwikCreateAccount(account as any);
      const res = (await qwikGetAccount({
        provider: account.provider,
        provider_account_id: account.providerAccountId,
      })) as any;
      delete res.user;
      return res;
    },
    async unlinkAccount({ providerAccountId }) {
      return (await qwikDeleteAccount({
        provider_account_id: providerAccountId,
      })) as any;
    },
    async createSession({ sessionToken, userId, expires }) {
      await qwikCreateSession({
        session_token: sessionToken,
        user_id: userId,
        expires,
      } as any);
      const res = qwikGetSession(sessionToken);
      return res as any;
    },
    async getSessionAndUser(sessionToken) {
      return (await qwikGetSession(sessionToken)) as any;
    },
    async updateSession(data) {
      await qwikUpdateSession(data as any);
      return (await qwikGetSession(data.sessionToken)) as any;
    },
    async deleteSession(sessionToken) {
      return (await qwikDeleteSession(sessionToken)) as any;
    },
    async createVerificationToken(data) {
      await qwikCreateVToken(data);
      return (await qwikGetVToken(data)) as any;
    },
    async useVerificationToken({ identifier, token }) {
      return (await qwikDeleteVToken({ identifier, token })) as any;
    },
  };
};
