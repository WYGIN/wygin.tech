CREATE TABLE `users` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`email` varchar(512),
	`email_verified` boolean DEFAULT false,
	`image` text,
	`role` enum('user','editor','contributor','sponser','admin','owner') NOT NULL DEFAULT 'user');

CREATE TABLE `blogs` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`vc_id` varchar(12) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` varchar(1000) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`featured_image` text NOT NULL,
	`status` enum('published','draft','scheduled','archived') NOT NULL DEFAULT 'published',
	`author_id` varchar(12) NOT NULL,
	`contributor_id` varchar(12),
	`created_on` datetime(3) NOT NULL,
	`schema` text NOT NULL,
	`updated_on` datetime(3) NOT NULL,
	`body` text NOT NULL,
	`header_id` varchar(12) NOT NULL,
	`footer_id` varchar(12) NOT NULL,
	`likes` int NOT NULL,
	`disLikes` int NOT NULL,
	`publication_id` varchar(12) NOT NULL);

CREATE TABLE `bookmarks` (
	`post_id` varchar(12),
	`blog_id` varchar(12),
	`user_id` varchar(12) NOT NULL);

CREATE TABLE `categories` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`category1` varchar(15) NOT NULL,
	`category2` varchar(15) NOT NULL,
	`logo` text NOT NULL,
	`created_on` datetime(3) NOT NULL,
	`updated_on` datetime(3) NOT NULL);

CREATE TABLE `category_followers` (
	`category_id` varchar(12),
	`user_id` varchar(12));

CREATE TABLE `comments` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`user_id` varchar(12) NOT NULL,
	`comment` text NOT NULL,
	`replied_to` varchar(12),
	`post_id` varchar(12) NOT NULL);

CREATE TABLE `footers` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`logo` text NOT NULL DEFAULT ('https://wygin.tech/wygin.svg'),
	`show_social_icons` boolean NOT NULL DEFAULT true);

CREATE TABLE `headers` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`logo` text NOT NULL DEFAULT ('https://wygin.tech/wygin.svg'),
	`show_theme_toggle` boolean NOT NULL DEFAULT true,
	`show_search_icon` boolean NOT NULL DEFAULT true);

CREATE TABLE `nav_items` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`href` varchar(500) NOT NULL,
	`label` text NOT NULL);

CREATE TABLE `pages` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`vc_id` varchar(12) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`slug` varchar(191) NOT NULL,
	`featured_image` text NOT NULL,
	`status` enum('published','draft','scheduled','archived') NOT NULL DEFAULT 'published',
	`author_id` varchar(12) NOT NULL,
	`created_on` datetime(3) NOT NULL,
	`schema` text NOT NULL,
	`updated_on` datetime(3) NOT NULL,
	`body` text NOT NULL,
	`header_id` varchar(12) NOT NULL,
	`footer_id` varchar(12) NOT NULL,
	`likes` int NOT NULL,
	`disLikes` int NOT NULL,
	`publication_id` varchar(12) NOT NULL);

CREATE TABLE `posts` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`vc_id` varchar(12) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`slug` varchar(191) NOT NULL,
	`featured_image` text NOT NULL,
	`status` enum('published','draft','scheduled','archived') NOT NULL DEFAULT 'published',
	`author_id` varchar(12) NOT NULL,
	`contributor_id` varchar(12),
	`created_on` datetime(3) NOT NULL,
	`schema` text NOT NULL,
	`updated_on` datetime(3) NOT NULL,
	`category_id` varchar(12) NOT NULL,
	`body` text NOT NULL,
	`header_id` varchar(12) NOT NULL,
	`footer_id` varchar(12) NOT NULL,
	`likes` int NOT NULL,
	`disLikes` int NOT NULL,
	`publication_id` varchar(12) NOT NULL);

CREATE TABLE `publications` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL,
	`description` text,
	`owner_id` varchar(12) NOT NULL,
	`logo` text NOT NULL,
	`created_on` datetime(3) NOT NULL,
	`updated_on` datetime(3) NOT NULL);

CREATE TABLE `publication_followers` (
	`publication_id` varchar(12) NOT NULL,
	`user_id` varchar(12) NOT NULL);

CREATE TABLE `publication_roles` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`publication_id` varchar(12) NOT NULL,
	`user_id` varchar(12) NOT NULL,
	`role` enum('user','editor','contributor','sponser','admin','owner') NOT NULL DEFAULT 'user');

CREATE TABLE `sessions` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`session_token` varchar(767) NOT NULL,
	`user_id` varchar(12) NOT NULL,
	`expires` datetime(3) NOT NULL);

CREATE TABLE `tags` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`category1` varchar(15) NOT NULL,
	`logo` text NOT NULL,
	`created_on` datetime(3) NOT NULL,
	`updated_on` datetime(3) NOT NULL);

CREATE TABLE `tag_followers` (
	`tag_id` varchar(12),
	`user_id` varchar(12));

CREATE TABLE `user_follows` (
	`follower_id` varchar(12) NOT NULL,
	`following_id` varchar(12) NOT NULL);

CREATE TABLE `verificationTokens` (
	`identifier` varchar(767) NOT NULL,
	`token` varchar(767) NOT NULL,
	`expires` datetime(3));

CREATE UNIQUE INDEX `unique__email` ON `users` (`email`);
CREATE INDEX `index__id` ON `users` (`id`);
CREATE INDEX `index__name` ON `users` (`name`);
CREATE UNIQUE INDEX `unique__slug` ON `blogs` (`slug`);
CREATE UNIQUE INDEX `unique_title` ON `blogs` (`title`);
CREATE INDEX `index__id` ON `blogs` (`id`);
CREATE INDEX `index__title` ON `blogs` (`title`);
CREATE INDEX `index__slug` ON `blogs` (`slug`);
CREATE UNIQUE INDEX `unique__post_id__blog_id__user_id` ON `bookmarks` (`post_id`,`blog_id`,`user_id`);
CREATE INDEX `index__user_id` ON `bookmarks` (`user_id`);
CREATE UNIQUE INDEX `unique__category` ON `categories` (`category1`,`category2`);
CREATE INDEX `index_category1` ON `categories` (`category1`);
CREATE INDEX `index_category2` ON `categories` (`category2`);
CREATE UNIQUE INDEX `unique__publication_id__user_id` ON `category_followers` (`category_id`,`user_id`);
CREATE INDEX `index__category_id` ON `category_followers` (`category_id`);
CREATE INDEX `index__user_id` ON `category_followers` (`user_id`);
CREATE INDEX `index__id` ON `comments` (`id`);
CREATE INDEX `index__user_id` ON `comments` (`user_id`);
CREATE INDEX `index__id` ON `footers` (`id`);
CREATE INDEX `index__id` ON `headers` (`id`);
CREATE UNIQUE INDEX `unique__href` ON `nav_items` (`href`);
CREATE INDEX `index__id` ON `nav_items` (`id`);
CREATE UNIQUE INDEX `unique__slug` ON `pages` (`slug`);
CREATE UNIQUE INDEX `unique_title` ON `pages` (`title`);
CREATE INDEX `index__id` ON `pages` (`id`);
CREATE INDEX `index__title` ON `pages` (`title`);
CREATE INDEX `index__slug` ON `pages` (`slug`);
CREATE UNIQUE INDEX `unique__slug__category_id` ON `posts` (`slug`,`category_id`);
CREATE UNIQUE INDEX `unique_title` ON `posts` (`title`);
CREATE INDEX `index__id` ON `posts` (`id`);
CREATE INDEX `index__title` ON `posts` (`title`);
CREATE INDEX `index__slug__category_id` ON `posts` (`slug`,`category_id`);
CREATE UNIQUE INDEX `unique__name` ON `publications` (`name`);
CREATE INDEX `index__id` ON `publications` (`id`);
CREATE INDEX `index__name` ON `publications` (`name`);
CREATE UNIQUE INDEX `unique__publication_id__user_id` ON `publication_followers` (`publication_id`,`user_id`);
CREATE INDEX `index__publication_id` ON `publication_followers` (`publication_id`);
CREATE INDEX `index__user_id` ON `publication_followers` (`user_id`);
CREATE UNIQUE INDEX `unique__publication_id__user_id` ON `publication_roles` (`publication_id`,`user_id`);
CREATE INDEX `index__user_id` ON `publication_roles` (`user_id`);
CREATE INDEX `index__publication_id` ON `publication_roles` (`publication_id`);
CREATE UNIQUE INDEX `unique__session_token` ON `sessions` (`session_token`);
CREATE INDEX `index__id` ON `sessions` (`id`);
CREATE INDEX `index__user_id` ON `sessions` (`user_id`);
CREATE UNIQUE INDEX `unique__tag` ON `tags` (`category1`);
CREATE INDEX `index_tag` ON `tags` (`category1`);
CREATE UNIQUE INDEX `unique__publication_id__user_id` ON `tag_followers` (`tag_id`,`user_id`);
CREATE INDEX `index__tag_id` ON `tag_followers` (`tag_id`);
CREATE INDEX `index__user_id` ON `tag_followers` (`user_id`);
CREATE UNIQUE INDEX `unique__follower_id__following_id` ON `user_follows` (`follower_id`,`following_id`);
CREATE INDEX `index__follower_id` ON `user_follows` (`follower_id`);
CREATE INDEX `index__following_id` ON `user_follows` (`following_id`);
CREATE UNIQUE INDEX `unique__token` ON `verificationTokens` (`token`);