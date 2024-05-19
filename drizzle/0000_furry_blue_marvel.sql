CREATE TABLE `todos` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`title` text,
	`done` integer DEFAULT 0,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
