import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const user = sqliteTable('auth_user', {
	id: text('id', { length: 255 }).primaryKey(),
	email: text('email').unique().notNull(),

	// From GitHub
	githubUsername: text('github_username', { length: 255 }).unique()
});

const userProfile = sqliteTable('user_profile', {
	id: text('id', { length: 255 }).primaryKey(),
	userId: text('user_id', { length: 255 })
		.unique()
		.notNull()
		.references(() => user.id),

	// From Google
	firstName: text('first_name', { length: 255 }),
	lastName: text('last_name', { length: 255 }),
	picture: text('picture', { length: 255 })
});

const userKey = sqliteTable('user_key', {
	id: text('id', { length: 255 }).primaryKey(),
	userId: text('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	hashedPassword: text('hashed_password', { length: 255 })
});

const userSession = sqliteTable('user_session', {
	id: text('id', { length: 255 }).primaryKey(),
	userId: text('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	activeExpires: blob('active_expires', { mode: 'bigint' }).notNull(),
	idleExpires: blob('idle_expires', { mode: 'bigint' }).notNull()
});

export { user, userKey, userProfile, userSession };

