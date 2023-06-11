CREATE TABLE `blogs` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`vc_id` varchar(12) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`slug` varchar(191) NOT NULL,
	`featured_image` text NOT NULL,
	`status` enum('published','draft','scheduled','archived') NOT NULL DEFAULT 'published',
	`author_id` varchar(12) NOT NULL,
	`contributor_id` varchar(12),
	`created_on` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`schema` text NOT NULL,
	`updated_on` datetime(3) NOT NULL DEFAULT NOW(),
	`body` text NOT NULL,
	`header_id` varchar(12) NOT NULL,
	`footer_id` varchar(12) NOT NULL,
	`likes` int NOT NULL,
	`disLikes` int NOT NULL,
	`publication_id` varchar(12) NOT NULL);

CREATE TABLE `categories` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`category1` varchar(15) NOT NULL,
	`category2` varchar(15) NOT NULL,
	`logo` text NOT NULL,
	`created_on` datetime(3) NOT NULL DEFAULT,
	`updated_on` datetime(3) NOT NULL DEFAULT NOW(3));

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
	`href` text NOT NULL,
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
	`created_on` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`schema` text NOT NULL,
	`updated_on` datetime(3) NOT NULL DEFAULT NOW(3),
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
	`created_on` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`schema` text NOT NULL,
	`updated_on` datetime(3) NOT NULL DEFAULT NOW(3),
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
	`created_on` datetime(3) NOT NULL DEFAULT CURRENT_DATE(),
	`updated_on` datetime(3) NOT NULL DEFAULT NOW());

CREATE TABLE `publication_followers` (
	`publication_id` varchar(12) NOT NULL,
	`user_id` varchar(12) NOT NULL);

CREATE TABLE `publication_roles` (
	`publication_id` varchar(12) NOT NULL,
	`user_id` varchar(12) NOT NULL,
	`role` enum('user','editor','contributor','sponser','admin','owner') NOT NULL DEFAULT 'user');

CREATE UNIQUE INDEX `unique__slug` ON `blogs` (`slug`);
CREATE UNIQUE INDEX `unique_title` ON `blogs` (`title`);
CREATE UNIQUE INDEX `unique_description` ON `blogs` (`description`);
CREATE INDEX `index__id` ON `blogs` (`id`);
CREATE INDEX `index__title` ON `blogs` (`title`);
CREATE INDEX `index__slug` ON `blogs` (`slug`);
CREATE UNIQUE INDEX `unique__category` ON `categories` (`category1`,`category2`);
CREATE INDEX `index_category1` ON `categories` (`category1`);
CREATE INDEX `index_category2` ON `categories` (`category2`);
CREATE UNIQUE INDEX `unique__comment` ON `comments` (`comment`);
CREATE INDEX `index__id` ON `comments` (`id`);
CREATE INDEX `index__user_id` ON `comments` (`user_id`);
CREATE UNIQUE INDEX `unique__logo__show_social_icons` ON `footers` (`logo`,`show_social_icons`);
CREATE INDEX `index__id` ON `footers` (`id`);
CREATE UNIQUE INDEX `unique__logo__show_theme_toggle__show_search_icon` ON `headers` (`logo`,`show_theme_toggle`,`show_search_icon`);
CREATE INDEX `index__id` ON `headers` (`id`);
CREATE UNIQUE INDEX `unique__href` ON `nav_items` (`href`);
CREATE INDEX `index__id` ON `nav_items` (`id`);
CREATE UNIQUE INDEX `unique__slug` ON `pages` (`slug`);
CREATE UNIQUE INDEX `unique_title` ON `pages` (`title`);
CREATE UNIQUE INDEX `unique_description` ON `pages` (`description`);
CREATE INDEX `index__id` ON `pages` (`id`);
CREATE INDEX `index__title` ON `pages` (`title`);
CREATE INDEX `index__slug` ON `pages` (`slug`);
CREATE UNIQUE INDEX `unique__slug__category_id` ON `posts` (`slug`,`category_id`);
CREATE UNIQUE INDEX `unique_title` ON `posts` (`title`);
CREATE UNIQUE INDEX `unique_description` ON `posts` (`description`);
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