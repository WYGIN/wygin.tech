CREATE TABLE `user_follows` (
	`follower_id` varchar(12) NOT NULL,
	`following_id` varchar(12) NOT NULL);

CREATE TABLE `verificationTokens` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` datetime(3));

CREATE UNIQUE INDEX `unique__follower_id__following_id` ON `user_follows` (`follower_id`,`following_id`);
CREATE INDEX `index__follower_id` ON `user_follows` (`follower_id`);
CREATE INDEX `index__following_id` ON `user_follows` (`following_id`);
CREATE UNIQUE INDEX `unique__identifier__token` ON `verificationTokens` (`identifier`,`token`);