import { db } from "./index";

import { placeholder, eq, and, InferModel } from "drizzle-orm";

import { nanoid } from "nanoid/async";

import { accounts } from "../schema/account";
import { blogs } from "../schema/blog";
import { bookmarks } from "../schema/bookmark";
import { categories } from "../schema/category";
import { category_followers } from "../schema/categoryFollower";
import { comments } from "../schema/comment";
import { footers } from "../schema/footer";
import { headers } from "../schema/header";
import { nav_items } from "../schema/navItem";
import { pages } from "../schema/page";
import { posts } from "../schema/post";
import { publications } from "../schema/publication";
import { publication_followers } from "../schema/publicationFollower";
import { publication_roles } from "../schema/publicationRole";
import { sessions } from "../schema/session";
import { tags } from "../schema/tag";
import { tag_followers } from "../schema/tagFollower";
import { users } from "../schema/user";
import { user_followers } from "../schema/userFollower";
import { verification_tokens } from "../schema/verificationToken";

export type insert__accounts = InferModel<typeof accounts, "insert">;
export type update__accounts = Pick<
  insert__accounts,
  | "access_token"
  | "expires_at"
  | "refresh_token"
  | "provider"
  | "provider_account_id"
>;
export type insert__blogs = InferModel<typeof blogs, "insert">;
export type insert__bookmarks = InferModel<typeof bookmarks, "insert">;
export type insert__categories = InferModel<typeof categories, "insert">;
export type insert__category_followers = InferModel<
  typeof category_followers,
  "insert"
>;
export type insert__comments = InferModel<typeof comments, "insert">;
export type insert__footers = InferModel<typeof footers, "insert">;
export type insert__headers = InferModel<typeof headers, "insert">;
export type insert__nav_items = InferModel<typeof nav_items, "insert">;
export type insert__pages = InferModel<typeof pages, "insert">;
export type insert__posts = InferModel<typeof posts, "insert">;
export type insert__publications = InferModel<typeof publications, "insert">;
export type insert__publication_followers = InferModel<
  typeof publication_followers,
  "insert"
>;
export type insert__publication_roles = InferModel<
  typeof publication_roles,
  "insert"
>;
export type insert__sessions = InferModel<typeof sessions, "insert">;
export type insert__tags = InferModel<typeof tags, "insert">;
export type insert__tag_followers = InferModel<typeof tag_followers, "insert">;
export type insert__users = InferModel<typeof users, "insert">;
export type insert__user_followers = InferModel<
  typeof user_followers,
  "insert"
>;
export type insert__verification_tokens = InferModel<
  typeof verification_tokens,
  "insert"
>;

export type accountProps = Omit<
  insert__accounts,
  "provider" | "provider_account_id"
>;
export type blogProps = Omit<insert__blogs, "slug">;
export type categoryProps = Omit<insert__categories, "id">;
export type commentProps = Omit<insert__comments, "id">;
export type footerProps = Omit<insert__footers, "id">;
export type headerProps = Omit<insert__headers, "id">;
export type navProps = Omit<insert__nav_items, "id">;
export type pageProps = Omit<insert__pages, "id">;
export type postsProps = Omit<insert__posts, "id" | "slug" | "category_id">;
export type publicationProps = Omit<insert__publications, "name">;
export type sessionProps = Omit<insert__sessions, "session_token">;
export type tagProps = Omit<insert__tags, "tag">;
export type createUserProps = Omit<insert__users, "id">;
export type updateUserProps = Omit<insert__users, "email">;
export type vtokenProps = Omit<insert__verification_tokens, "token">;

export const getAccounts = db
  .select()
  .from(accounts)
  .where(
    and(
      eq(accounts.user_id, placeholder("user_id")),
      eq(accounts.provider, placeholder("provider"))
    )
  )
  .prepare();
export const getAccountById = db
  .select()
  .from(accounts)
  .where(
    and(
      eq(accounts.provider as any, placeholder("provider") as any),
      eq(
        accounts.provider_account_id as any,
        placeholder("provider_account_id") as any
      )
    )
  )
  .limit(1)
  .prepare();
export const createAccount = async (accountData: accountProps) =>
  db.insert(accounts).values({ ...accountData, id: await nanoid() } as any);
export const updateAccount = (accountData: update__accounts) =>
  db
    .update(accounts)
    .set(accountData)
    .where(
      and(
        eq(accounts.provider as any, accountData.provider as any),
        eq(
          accounts.provider_account_id as any,
          accountData.provider_account_id as any
        )
      )
    );
export const deleteAccountWithProviderAccountId = (
  provider_account_id: string
) =>
  db
    .delete(accounts)
    .where(eq(accounts.provider_account_id as any, provider_account_id as any));

export const getBookmarks = db
  .select()
  .from(bookmarks)
  .where(eq(bookmarks.user_id as any, placeholder("user_id") as any))
  .prepare();
export const createBookmark = (bookmarkData: insert__bookmarks) =>
  db.insert(bookmarks).values(bookmarkData as any);
export const deleteBookmark = (bookmarkData: insert__bookmarks) =>
  db.delete(bookmarks).where(eq(blogs as any, bookmarkData as any));

export const getBlogs = db.select().from(blogs);
export const getBlogBySlug = db
  .select()
  .from(blogs)
  .where(eq(blogs.slug as any, placeholder("slug") as any))
  .limit(1)
  .prepare();
export const createBlog = async (blogData: insert__blogs) =>
  db.insert(blogs).values({ ...blogData, id: await nanoid() } as any);
export const updateBlog = (blogData: insert__blogs) =>
  db
    .update(blogs)
    .set(blogData as blogProps)
    .where(eq(blogs.slug as any, blogData.slug as any));
export const deleteBlog = (slug: string) =>
  db.delete(blogs).where(eq(blogs.slug as any, slug as any));

export const getCategory = db
  .select()
  .from(categories)
  .where(
    and(
      eq(categories.category1 as any, placeholder("category1") as any),
      eq(categories.category2 as any, placeholder("category2") as any)
    )
  )
  .limit(1)
  .prepare();
export const createCategory = async (categoryData: insert__categories) =>
  db.insert(categories).values({ ...categoryData, id: await nanoid() } as any);
export const updateCategory = (categoryData: insert__categories) =>
  db
    .update(categories)
    .set(categoryData as categoryProps)
    .where(eq(categories.id as any, categoryData.id as any));
export const deleteCategory = (id: string) =>
  db.delete(categories).where(eq(categories.id as any, id as any));

export const followCategory = db
  .insert(category_followers)
  .values({
    category_id: placeholder("category_id"),
    user_id: placeholder("user_id"),
  } as any)
  .prepare();
export const unfollowCategory = db
  .delete(category_followers)
  .where({
    category_id: placeholder("category_id"),
    user_id: placeholder("user_id"),
  } as any)
  .prepare();

export const getCommentsByPostSlug = db
  .select()
  .from(posts)
  .where(eq(posts.id as any, placeholder("post_id") as any))
  .fullJoin(comments, eq(comments.post_id, posts.id))
  .prepare();

export const createComment = async (props: insert__comments) =>
  db.insert(comments).values({ ...props, id: await nanoid() });

export const updateComment = (props: commentProps) =>
  db
    .update(comments)
    .set(props)
    .where(eq(comments.id, placeholder("id")))
    .prepare();

export const deleteComment = (id: string) =>
  db.delete(comments).where(eq(comments.id, id));

export const getFooterById = db
  .select()
  .from(footers)
  .where(eq(footers.id as any, placeholder("id") as any))
  .prepare();
export const createFooter = async (footerData: insert__footers) =>
  db.insert(footers).values({ ...footerData, id: await nanoid() } as any);
export const updateFooter = (footerData: insert__footers) =>
  db
    .update(footers)
    .set(footerData as footerProps)
    .where(eq(footers.id as any, footerData.id as any));
export const deleteFooter = (id: string) =>
  db.delete(footers).where(eq(footers.id as any, id as any));

export const getHeaderById = db
  .select()
  .from(headers)
  .where(eq(headers.id as any, placeholder("id") as any))
  .prepare();
export const createHeader = async (headerData: insert__headers) =>
  db.insert(headers).values({ ...headerData, id: await nanoid() } as any);
export const updateHeader = (headerData: insert__headers) =>
  db
    .update(headers)
    .set(headerData as headerProps)
    .where(eq(headers.id as any, headerData.id as any));
export const deleteHeader = (id: string) =>
  db.delete(headers).where(eq(headers.id as any, id as any));

export const getNavItemById = db
  .select()
  .from(nav_items)
  .where(eq(nav_items.id as any, placeholder("id") as any))
  .prepare();
export const createNavItem = async (navData: insert__nav_items) =>
  db.insert(nav_items).values({ ...navData, id: await nanoid() } as any);
export const updateNavItem = (navData: insert__nav_items) =>
  db
    .update(nav_items)
    .set(navData as navProps)
    .where(eq(nav_items.id as any, navData.id as any));
export const deleteNavItem = (id: string) =>
  db.delete(nav_items).where(eq(nav_items.id as any, id as any));

export const getPages = db.select().from(pages);
export const getPageBySlug = db
  .select()
  .from(pages)
  .where(eq(pages.slug as any, placeholder("slug") as any))
  .limit(1)
  .prepare();
export const createPage = async (pageData: insert__pages) =>
  db.insert(pages).values({ ...pageData, id: await nanoid() } as any);
export const updatePage = (pageData: insert__pages) =>
  db
    .update(pages)
    .set(pageData as pageProps)
    .where(eq(pages.slug as any, pageData.slug as any));
export const deletePage = (slug: string) =>
  db.delete(pages).where(eq(pages.slug as any, slug as any));

export const getPosts = db.select().from(posts);
export const getPost = db
  .select()
  .from(posts)
  .where(
    and(
      eq(categories.category1 as any, placeholder("category1")),
      eq(categories.category2 as any, placeholder("category2")),
      eq(posts.slug as any, placeholder("slug"))
    )
  )
  .prepare();
export const createPost = async (postData: insert__posts) =>
  db.insert(posts).values({ ...postData, id: await nanoid() } as any);
export const updatePost = (postData: insert__posts) =>
  db
    .update(posts)
    .set(postData as postsProps)
    .where(
      and(
        eq(posts.slug as any, postData.slug as any),
        eq(posts.category_id as any, postData.category_id as any)
      )
    );
export const deletePost = (slug: string, category_id: string) =>
  db
    .delete(posts)
    .where(
      and(
        eq(posts.slug as any, slug as any),
        eq(posts.category_id as any, category_id as any)
      )
    );

export const getPublication = db
  .select()
  .from(publications)
  .where(eq(publications.name as any, placeholder("id") as any))
  .prepare();
export const getPublications = db.select().from(publications);
export const createPublication = async (
  publicationData: insert__publications
) =>
  db
    .insert(publications)
    .values({ ...publicationData, id: await nanoid() } as any);
export const updatePublication = (publicationData: insert__publications) =>
  db
    .update(publications)
    .set(publicationData as publicationProps)
    .where(eq(publications.name as any, publicationData.name as any));
export const deletePublication = (name: string) =>
  db.delete(publications).where(eq(publications.name as any, name as any));

export const followPublication = (followData: insert__publication_followers) =>
  db.insert(publication_followers).values(followData as any);
export const unfollowPublication = (
  followData: insert__publication_followers
) =>
  db
    .delete(publication_followers)
    .where(eq(publication_followers as any, followData as any));

export const addUserToPublication = (data: insert__publication_roles) =>
  db.insert(publication_roles).values(data as any);
export const removeUserToPublication = (data: insert__publication_roles) =>
  db
    .delete(publication_roles)
    .where(eq(publication_followers as any, data as any));

export const getSession = (token: string) =>
  db
    .select()
    .from(sessions)
    .where(eq(sessions.session_token as any, token as any))
    .fullJoin(users, eq(sessions.user_id, users.id));

export const createSession = async (data: insert__sessions) =>
  db.insert(sessions).values({ ...data, id: await nanoid() } as any);
export const updateSession = (data: insert__sessions) =>
  db
    .update(sessions)
    .set(data as sessionProps)
    .where(eq(sessions.session_token as any, data.session_token as any));
export const deleteSession = (session_token: string) =>
  db
    .delete(sessions)
    .where(eq(sessions.session_token as any, session_token as any));

export const getTags = db.select().from(tags);
export const getTag = db
  .select()
  .from(tags)
  .where(eq(tags.tag as any, placeholder("tag") as any))
  .prepare();
export const createTag = async (tagData: insert__tags) =>
  db.insert(tags).values({ ...tagData, id: await nanoid() } as any);
export const updateTag = (tagData: insert__tags) =>
  db
    .update(tags)
    .set(tagData as tagProps)
    .where(eq(tags.tag as any, tagData.tag as any));
export const deleteTag = (tag: string) =>
  db.delete(tags).where(eq(tags.tag as any, tag as any));

export const followTag = (data: insert__tag_followers) =>
  db.insert(tag_followers).values(data as any);
export const unfollowTag = (data: insert__tag_followers) =>
  db.delete(tag_followers).where(eq(tags as any, data as any));

export const getUserById = db
  .select()
  .from(users)
  .where(eq(users.id as any, placeholder("id") as any))
  .limit(1)
  .prepare();
export const getUserByEmail = db
  .select()
  .from(users)
  .where(eq(users.email as any, placeholder("email") as any))
  .limit(1)
  .prepare();
export const createUser = async (userData: insert__users) =>
  db.insert(users).values({ ...userData, id: await nanoid() } as any);
export const updateUserById = (userData: insert__users) =>
  db
    .update(users)
    .set(userData as createUserProps)
    .where(eq(users.id as any, userData.id as any));
export const updateUserByEmail = (userData: insert__users) =>
  db
    .update(users)
    .set(userData as updateUserProps)
    .where(eq(users.email as any, userData.email as any));
export const deleteUserById = (id: string) =>
  db.delete(users).where(eq(users.id as any, id as any));
export const deleteUserByEmail = (email: string) =>
  db.delete(users).where(eq(users.email as any, email as any));

export const followUser = (data: insert__user_followers) =>
  db.insert(user_followers).values(data as any);
export const unfollowUser = (data: insert__user_followers) =>
  db.delete(user_followers).where(eq(user_followers as any, data as any));

export const getVerificationToken = (data: insert__verification_tokens) =>
  db
    .select()
    .from(verification_tokens)
    .where(eq(verification_tokens.token as any, data.token as any));
export const createVerificationToken = (data: insert__verification_tokens) =>
  db.insert(verification_tokens).values(data as any);
export const updateVerificationToken = (data: insert__verification_tokens) =>
  db
    .update(verification_tokens)
    .set(data as vtokenProps)
    .where(eq(verification_tokens.token as any, data.token as any));
export const deleteVerificationToken = (data: insert__verification_tokens) =>
  db
    .delete(verification_tokens)
    .where(
      and(
        eq(verification_tokens.token, data.token),
        eq(verification_tokens.identifier, data.identifier)
      )
    );
