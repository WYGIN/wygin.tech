import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  uniqueIndex,
  index,
  varchar,
  text,
  int,
  mysqlEnum,
  datetime,
  tinyint,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const accounts = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    type: text("type").notNull(),
    provider: varchar("provider", { length: 256 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 256,
    }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: int("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => {
    return {
      uniqueProviderProviderAccountId: uniqueIndex(
        "unique__provider__provider_account_id"
      ).on(table.provider, table.providerAccountId),
      indexUserId: index("index__user_id").on(table.userId),
    };
  }
);

export const blogs = mysqlTable(
  "blogs",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    vcId: varchar("vc_id", { length: 12 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 1000 }).notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    featuredImage: text("featured_image").notNull(),
    status: mysqlEnum("status", ["published", "draft", "scheduled", "archived"])
      .default("published")
      .notNull(),
    authorId: varchar("author_id", { length: 12 }).notNull(),
    contributorId: varchar("contributor_id", { length: 12 }),
    createdOn: datetime("created_on", { mode: "string", fsp: 3 }).notNull(),
    schema: text("schema").notNull(),
    updatedOn: datetime("updated_on", { mode: "string", fsp: 3 }).notNull(),
    body: text("body").notNull(),
    headerId: varchar("header_id", { length: 12 }).notNull(),
    footerId: varchar("footer_id", { length: 12 }).notNull(),
    likes: int("likes").notNull(),
    disLikes: int("disLikes").notNull(),
    publicationId: varchar("publication_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      uniqueSlug: uniqueIndex("unique__slug").on(table.slug),
      uniqueTitle: uniqueIndex("unique_title").on(table.title),
      indexId: index("index__id").on(table.id),
      indexTitle: index("index__title").on(table.title),
      indexSlug: index("index__slug").on(table.slug),
    };
  }
);

export const bookmarks = mysqlTable(
  "bookmarks",
  {
    postId: varchar("post_id", { length: 12 }),
    blogId: varchar("blog_id", { length: 12 }),
    userId: varchar("user_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      uniquePostIdBlogIdUserId: uniqueIndex(
        "unique__post_id__blog_id__user_id"
      ).on(table.postId, table.blogId, table.userId),
      indexUserId: index("index__user_id").on(table.userId),
    };
  }
);

export const categories = mysqlTable(
  "categories",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    category1: varchar("category1", { length: 15 }).notNull(),
    category2: varchar("category2", { length: 15 }).notNull(),
    logo: text("logo").notNull(),
    createdOn: datetime("created_on", { mode: "string", fsp: 3 }).notNull(),
    updatedOn: datetime("updated_on", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      uniqueCategory: uniqueIndex("unique__category").on(
        table.category1,
        table.category2
      ),
      indexCategory1: index("index_category1").on(table.category1),
      indexCategory2: index("index_category2").on(table.category2),
    };
  }
);

export const categoryFollowers = mysqlTable(
  "category_followers",
  {
    categoryId: varchar("category_id", { length: 12 }),
    userId: varchar("user_id", { length: 12 }),
  },
  (table) => {
    return {
      uniquePublicationIdUserId: uniqueIndex(
        "unique__publication_id__user_id"
      ).on(table.categoryId, table.userId),
      indexCategoryId: index("index__category_id").on(table.categoryId),
      indexUserId: index("index__user_id").on(table.userId),
    };
  }
);

export const comments = mysqlTable(
  "comments",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    userId: varchar("user_id", { length: 12 }).notNull(),
    comment: text("comment").notNull(),
    repliedTo: varchar("replied_to", { length: 12 }),
    postId: varchar("post_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      indexId: index("index__id").on(table.id),
      indexUserId: index("index__user_id").on(table.userId),
    };
  }
);

export const footers = mysqlTable(
  "footers",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    logo: text("logo")
      .default(sql`('https://wygin.tech/wygin.svg')`)
      .notNull(),
    showSocialIcons: tinyint("show_social_icons").default(1).notNull(),
  },
  (table) => {
    return {
      indexId: index("index__id").on(table.id),
    };
  }
);

export const headers = mysqlTable(
  "headers",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    logo: text("logo")
      .default(sql`('https://wygin.tech/wygin.svg')`)
      .notNull(),
    showThemeToggle: tinyint("show_theme_toggle").default(1).notNull(),
    showSearchIcon: tinyint("show_search_icon").default(1).notNull(),
  },
  (table) => {
    return {
      indexId: index("index__id").on(table.id),
    };
  }
);

export const navItems = mysqlTable(
  "nav_items",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    name: text("name").notNull(),
    href: varchar("href", { length: 500 }).notNull(),
    label: text("label").notNull(),
    parentNav: varchar("parent_nav", { length: 12 }),
  },
  (table) => {
    return {
      uniqueHref: uniqueIndex("unique__href").on(table.href),
      indexId: index("index__id").on(table.id),
    };
  }
);

export const pages = mysqlTable(
  "pages",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    vcId: varchar("vc_id", { length: 12 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description").notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    featuredImage: text("featured_image").notNull(),
    status: mysqlEnum("status", ["published", "draft", "scheduled", "archived"])
      .default("published")
      .notNull(),
    authorId: varchar("author_id", { length: 12 }).notNull(),
    createdOn: datetime("created_on", { mode: "string", fsp: 3 }).notNull(),
    schema: text("schema").notNull(),
    updatedOn: datetime("updated_on", { mode: "string", fsp: 3 }).notNull(),
    body: text("body").notNull(),
    headerId: varchar("header_id", { length: 12 }).notNull(),
    footerId: varchar("footer_id", { length: 12 }).notNull(),
    likes: int("likes").notNull(),
    disLikes: int("disLikes").notNull(),
    publicationId: varchar("publication_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      uniqueSlug: uniqueIndex("unique__slug").on(table.slug),
      uniqueTitle: uniqueIndex("unique_title").on(table.title),
      indexId: index("index__id").on(table.id),
      indexTitle: index("index__title").on(table.title),
      indexSlug: index("index__slug").on(table.slug),
    };
  }
);

export const posts = mysqlTable(
  "posts",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    vcId: varchar("vc_id", { length: 12 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description").notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    featuredImage: text("featured_image").notNull(),
    status: mysqlEnum("status", ["published", "draft", "scheduled", "archived"])
      .default("published")
      .notNull(),
    authorId: varchar("author_id", { length: 12 }).notNull(),
    contributorId: varchar("contributor_id", { length: 12 }),
    createdOn: datetime("created_on", { mode: "string", fsp: 3 }).notNull(),
    schema: text("schema").notNull(),
    updatedOn: datetime("updated_on", { mode: "string", fsp: 3 }).notNull(),
    categoryId: varchar("category_id", { length: 12 }).notNull(),
    body: text("body").notNull(),
    headerId: varchar("header_id", { length: 12 }).notNull(),
    footerId: varchar("footer_id", { length: 12 }).notNull(),
    likes: int("likes").notNull(),
    disLikes: int("disLikes").notNull(),
    publicationId: varchar("publication_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      uniqueSlugCategoryId: uniqueIndex("unique__slug__category_id").on(
        table.slug,
        table.categoryId
      ),
      uniqueTitle: uniqueIndex("unique_title").on(table.title),
      indexId: index("index__id").on(table.id),
      indexTitle: index("index__title").on(table.title),
      indexSlugCategoryId: index("index__slug__category_id").on(
        table.slug,
        table.categoryId
      ),
    };
  }
);

export const publicationFollowers = mysqlTable(
  "publication_followers",
  {
    publicationId: varchar("publication_id", { length: 12 }).notNull(),
    userId: varchar("user_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      uniquePublicationIdUserId: uniqueIndex(
        "unique__publication_id__user_id"
      ).on(table.publicationId, table.userId),
      indexPublicationId: index("index__publication_id").on(
        table.publicationId
      ),
      indexUserId: index("index__user_id").on(table.userId),
      publicationFollowersPublicationIdUserId: primaryKey(
        table.publicationId,
        table.userId
      ),
    };
  }
);

export const publicationRoles = mysqlTable(
  "publication_roles",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    publicationId: varchar("publication_id", { length: 12 }).notNull(),
    userId: varchar("user_id", { length: 12 }).notNull(),
    role: mysqlEnum("role", [
      "user",
      "editor",
      "contributor",
      "sponser",
      "admin",
      "owner",
    ])
      .default("user")
      .notNull(),
  },
  (table) => {
    return {
      uniquePublicationIdUserId: uniqueIndex(
        "unique__publication_id__user_id"
      ).on(table.publicationId, table.userId),
      indexUserId: index("index__user_id").on(table.userId),
      indexPublicationId: index("index__publication_id").on(
        table.publicationId
      ),
    };
  }
);

export const publications = mysqlTable(
  "publications",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),
    ownerId: varchar("owner_id", { length: 12 }).notNull(),
    logo: text("logo").notNull(),
    createdOn: datetime("created_on", { mode: "string", fsp: 3 }).notNull(),
    updatedOn: datetime("updated_on", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      uniqueName: uniqueIndex("unique__name").on(table.name),
      indexId: index("index__id").on(table.id),
      indexName: index("index__name").on(table.name),
    };
  }
);

export const sessions = mysqlTable(
  "sessions",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    sessionToken: varchar("session_token", { length: 767 }).notNull(),
    userId: varchar("user_id", { length: 12 }).notNull(),
    expires: datetime("expires", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      uniqueSessionToken: uniqueIndex("unique__session_token").on(
        table.sessionToken
      ),
      indexId: index("index__id").on(table.id),
      indexUserId: index("index__user_id").on(table.userId),
    };
  }
);

export const tagFollowers = mysqlTable(
  "tag_followers",
  {
    tagId: varchar("tag_id", { length: 12 }),
    userId: varchar("user_id", { length: 12 }),
  },
  (table) => {
    return {
      uniquePublicationIdUserId: uniqueIndex(
        "unique__publication_id__user_id"
      ).on(table.tagId, table.userId),
      indexTagId: index("index__tag_id").on(table.tagId),
      indexUserId: index("index__user_id").on(table.userId),
    };
  }
);

export const tags = mysqlTable(
  "tags",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    category1: varchar("category1", { length: 15 }).notNull(),
    logo: text("logo").notNull(),
    createdOn: datetime("created_on", { mode: "string", fsp: 3 }).notNull(),
    updatedOn: datetime("updated_on", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      uniqueTag: uniqueIndex("unique__tag").on(table.category1),
      indexTag: index("index_tag").on(table.category1),
    };
  }
);

export const userFollows = mysqlTable(
  "user_follows",
  {
    followerId: varchar("follower_id", { length: 12 }).notNull(),
    followingId: varchar("following_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      uniqueFollowerIdFollowingId: uniqueIndex(
        "unique__follower_id__following_id"
      ).on(table.followerId, table.followingId),
      indexFollowerId: index("index__follower_id").on(table.followerId),
      indexFollowingId: index("index__following_id").on(table.followingId),
      userFollowsFollowerIdFollowingId: primaryKey(
        table.followerId,
        table.followingId
      ),
    };
  }
);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 12 }).primaryKey().notNull(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 512 }),
    emailVerified: tinyint("email_verified").default(0),
    image: text("image"),
    role: mysqlEnum("role", [
      "user",
      "editor",
      "contributor",
      "sponser",
      "admin",
      "owner",
    ])
      .default("user")
      .notNull(),
  },
  (table) => {
    return {
      uniqueEmail: uniqueIndex("unique__email").on(table.email),
      indexId: index("index__id").on(table.id),
      indexName: index("index__name").on(table.name),
    };
  }
);

export const verificationTokens = mysqlTable(
  "verificationTokens",
  {
    identifier: varchar("identifier", { length: 767 }).notNull(),
    token: varchar("token", { length: 767 }).primaryKey().notNull(),
    expires: datetime("expires", { mode: "string", fsp: 3 }),
  },
  (table) => {
    return {
      uniqueToken: uniqueIndex("unique__token").on(table.token),
    };
  }
);
