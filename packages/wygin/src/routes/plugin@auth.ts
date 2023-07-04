import { serverAuth$ } from "@builder.io/qwik-auth";
// import type { RequestEventBase } from "@builder.io/qwik-city";

import { type TokenSet } from "@auth/core/types";
import GitHub from "@auth/core/providers/github";
import LinkedIn from "@auth/core/providers/linkedin";
import Google from "@auth/core/providers/google";
import Twitter from "@auth/core/providers/twitter";
import type { Provider } from "@auth/core/providers";
// import type { AdapterAccount } from "@auth/core/adapters";

import { Adapter } from "~/Adapter";

import { updateAccount, getAccounts } from "~/servers/account";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    adapter: Adapter(),
    providers: [
      GitHub({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
      Google({
        clientId: env.get("GOOGLE_CLIENT_ID")!,
        clientSecret: env.get("GOOGLE_CLIENT_SECRET")!,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            include_granted_scopes: true,
          },
        },
      }),
      LinkedIn({
        clientId: env.get("LINKEDIN_CLIENT_ID")!,
        clientSecret: env.get("LINKEDIN_CLIENT_SECRET")!,
      }),
      Twitter({
        clientId: env.get("TWITTER_CLIENT_ID")!,
        clientSecret: env.get("TWITTER_CLIENT_SECRET")!,
      }),
    ] as Provider[],
    callbacks: {
      async session({ session, user, token }) {
        session.refresh_token = (token?.refresh_token as string) ?? "";
        session.provider = (token?.provider as string) ?? "";

        try {
          const [auth] = await getAccounts({
            user_id: user.id,
            provider: session.provider,
          });
          if (((auth.expires_at ?? 0) as number) * 1000 < Date.now()) {
            switch (auth.provider) {
              case "github":
                await refreshGithubAccessToken(env, auth, token, session);
                break;
              case "google":
                await refreshGoogleAccessToken(env, auth, token, session);
                break;
              case "linkedin":
                await refreshLinkedInAccessToken(env, auth, token, session);
                break;
              case "twitter":
                await refreshTwitterAccessToken(env, auth, token, session);
                break;
            }
          }
        } catch (error) {
          console.log("session error: ", error);
        }
        return session;
      },
    },
  }));

const refreshGithubAccessToken = async (
  env: any,
  auth: any,
  token: any,
  session: any
) => {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.get("GITHUB_CLIENT_ID")!,
      client_secret: env.get("GITHUB_CLIENT_SECRET")!,
      grant_type: "refresh_token",
      refresh_token: (auth.refresh_token as any) ?? token.refresh_token,
    }) as any as string,
    method: "POST",
  });

  const tokens: TokenSet = await response.json();
  if (!response.ok) throw tokens;

  await updateAccount({
    access_token: tokens.access_token,
    expires_at: Math.floor((tokens.expires_in as number) + Date.now() / 1000),
    refresh_token: tokens.refresh_token ?? auth.refresh_token,
    provider: session.provider,
    provider_account_id: auth.providerAccountId,
  });
};

const refreshGoogleAccessToken = async (
  env: any,
  auth: any,
  token: any,
  session: any
) => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.get("GOOGLE_CLIENT_ID")!,
      client_secret: env.get("GOOGLE_CLIENT_SECRET")!,
      grant_type: "refresh_token",
      refresh_token: (auth.refresh_token as any) ?? token.refresh_token,
    }) as any as string,
    method: "POST",
  });

  const tokens: TokenSet = await response.json();
  if (!response.ok) throw tokens;

  await updateAccount({
    access_token: tokens.access_token,
    expires_at: Math.floor((tokens.expires_in as number) + Date.now() / 1000),
    refresh_token: tokens.refresh_token ?? auth.refresh_token,
    provider: session.provider,
    provider_account_id: auth.providerAccountId,
  });
};

const refreshLinkedInAccessToken = async (
  env: any,
  auth: any,
  token: any,
  session: any
) => {
  const response = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.get("LINKEDIN_CLIENT_ID")!,
        client_secret: env.get("LINKEDIN_CLIENT_SECRET")!,
        grant_type: "refresh_token",
        refresh_token: (auth.refresh_token as any) ?? token.refresh_token,
      }) as any as string,
      method: "POST",
    }
  );

  const tokens: TokenSet = await response.json();
  if (!response.ok) throw tokens;

  await updateAccount({
    access_token: tokens.access_token,
    expires_at: Math.floor((tokens.expires_in as number) + Date.now() / 1000),
    refresh_token: tokens.refresh_token ?? auth.refresh_token,
    provider: session.provider,
    provider_account_id: auth.providerAccountId,
  });
};

const refreshTwitterAccessToken = async (
  env: any,
  auth: any,
  token: any,
  session: any
) => {
  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.get("TWITTER_CLIENT_ID")!,
      grant_type: "refresh_token",
      refresh_token: (auth.refresh_token as any) ?? token.refresh_token,
    }) as any as string,
    method: "POST",
  });

  const tokens: TokenSet = await response.json();
  if (!response.ok) throw tokens;

  await updateAccount({
    access_token: tokens.access_token,
    expires_at: Math.floor((tokens.expires_in as number) + Date.now() / 1000),
    refresh_token: tokens.refresh_token ?? auth.refresh_token,
    provider: session.provider,
    provider_account_id: auth.providerAccountId,
  });
};

declare module "@auth/core/jwt" {
  export interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "@auth/core/types" {
  export interface Session {
    error?: "RefreshAccessTokenError";
    refresh_token: string;
    provider: string;
  }
}
