CREATE TABLE `bookmarks` (
	`post_id` varchar(12),
	`blog_id` varchar(12),
	`user_id` varchar(12) NOT NULL);

CREATE TABLE `category_followers` (
	`category_id` varchar(12),
	`user_id` varchar(12));

CREATE TABLE `tags` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`category1` varchar(15) NOT NULL,
	`logo` text NOT NULL,
	`created_on` datetime(3) NOT NULL DEFAULT CURRENT_DATE(3),
	`updated_on` datetime(3) NOT NULL DEFAULT NOW(3));

CREATE TABLE `tag_followers` (
	`tag_id` varchar(12),
	`user_id` varchar(12));

CREATE UNIQUE INDEX `unique__post_id__blog_id__user_id` ON `bookmarks` (`post_id`,`blog_id`,`user_id`);
CREATE INDEX `index__user_id` ON `bookmarks` (`user_id`);
CREATE UNIQUE INDEX `unique__publication_id__user_id` ON `category_followers` (`category_id`,`user_id`);
CREATE INDEX `index__category_id` ON `category_followers` (`category_id`);
CREATE INDEX `index__user_id` ON `category_followers` (`user_id`);
CREATE UNIQUE INDEX `unique__tag` ON `tags` (`category1`);
CREATE INDEX `index_tag` ON `tags` (`category1`);
CREATE UNIQUE INDEX `unique__publication_id__user_id` ON `tag_followers` (`tag_id`,`user_id`);
CREATE INDEX `index__tag_id` ON `tag_followers` (`tag_id`);
CREATE INDEX `index__user_id` ON `tag_followers` (`user_id`);