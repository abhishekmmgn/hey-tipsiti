import type { Message } from "ai";
import type { InferSelectModel } from "drizzle-orm";
import {
	pgTable,
	varchar,
	timestamp,
	json,
	uuid,
	boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
	id: uuid("id").primaryKey().notNull(),
	email: varchar("email", { length: 64 }).unique().notNull(),
	name: varchar("name", { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("createdAt").notNull(),
	messages: json("messages").notNull(),
	userId: uuid()
		.notNull()
		.references(() => user.id),
});

export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
	messages: Array<Message>;
};

export const reservation = pgTable("Reservation", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("createdAt").notNull(),
	details: json("details").notNull(),
	hasCompletedPayment: boolean("hasCompletedPayment").notNull().default(false),
	userId: uuid()
		.notNull()
		.references(() => user.id),
});

export type Reservation = InferSelectModel<typeof reservation>;

export const booking = pgTable("Booking", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("createdAt").notNull(),
	details: json("details").notNull(),
	hasCompletedPayment: boolean("hasCompletedPayment").notNull().default(false),
	userId: uuid()
		.notNull()
		.references(() => user.id),
});

export type Booking = InferSelectModel<typeof booking>;

export const itinerary = pgTable("Itinerary", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("createdAt").notNull(),
	places: json("places").notNull(),
	bookings: json("bookings"),
	reservations: json("reservations"),
	chatId: uuid("chatId").references(() => chat.id),
	userId: uuid("userId")
		.notNull()
		.references(() => user.id),
});

export type Itinerary = InferSelectModel<typeof itinerary>;
