CREATE TABLE `users` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`email` text,
	`email_verified` boolean DEFAULT false,
	`image` text,
	`role` enum('user','editor','contributor','sponser','admin','owner') NOT NULL DEFAULT 'user');

CREATE TABLE `sessions` (
	`id` varchar(12) PRIMARY KEY NOT NULL,
	`session_token` text NOT NULL,
	`user_id` text NOT NULL,
	`expires` datetime(3) NOT NULL);

CREATE UNIQUE INDEX `unique__email` ON `users` (`email`);
CREATE INDEX `index__id` ON `users` (`id`);
CREATE INDEX `index__name` ON `users` (`name`);
CREATE UNIQUE INDEX `unique__session_token` ON `sessions` (`session_token`);
CREATE INDEX `index__id` ON `sessions` (`id`);
CREATE INDEX `index__user_id` ON `sessions` (`user_id`);