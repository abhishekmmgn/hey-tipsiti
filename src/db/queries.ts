import "server-only";

import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
	user,
	chat,
	type User,
	reservation,
	itinerary,
	Chat,
	booking,
} from "./schema";

const client = postgres(
	`${process.env.POSTGRES_URL as string}?sslmode=require`,
);
const db = drizzle(client);

export async function saveUser({
	id,
	email,
	name,
}: {
	id: string;
	email: string;
	name?: string;
}) {
	return await db.insert(user).values({
		id,
		email,
		name,
	});
}

export async function saveChat({
	id,
	messages,
	userId,
}: {
	id: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	messages: any;
	userId: string;
}) {
	try {
		const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

		if (selectedChats.length > 0) {
			return await db
				.update(chat)
				.set({
					messages: JSON.stringify(messages),
				})
				.where(eq(chat.id, id));
		}

		return await db.insert(chat).values({
			id,
			createdAt: new Date(),
			messages: JSON.stringify(messages),
			userId,
		});
	} catch (error) {
		console.error("Failed to save chat in database");
		throw error;
	}
}

export async function deleteChatById({ id }: { id: string }) {
	try {
		return await db.delete(chat).where(eq(chat.id, id));
	} catch (error) {
		console.error("Failed to delete chat by id from database");
		throw error;
	}
}

export async function getChatsByUserId(userId: string) {
	try {
		return await db
			.select()
			.from(chat)
			.where(eq(chat.userId, userId))
			.orderBy(desc(chat.createdAt));
	} catch (error) {
		console.error("Failed to get chats from database");
		throw error;
	}
}

export async function saveItinerary({
	id,
	places,
	bookings,
	reservations,
	chatId,
	userId,
}: {
	id: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	places: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	bookings: any;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	reservations: any;
	chatId: string;
	userId: string;
}) {
	try {
		const selectedItenerary = await db
			.select()
			.from(itinerary)
			.where(eq(itinerary.id, id));

		if (selectedItenerary.length > 0) {
			return await db
				.update(itinerary)
				.set({
					places: JSON.stringify(places),
					bookings: JSON.stringify(bookings),
					reservations: JSON.stringify(reservations),
				})
				.where(eq(chat.id, id));
		}

		return await db.insert(itinerary).values({
			id,
			chatId,
			userId,
			createdAt: new Date(),
			bookings: JSON.stringify(bookings),
			reservations: JSON.stringify(reservations),
			places: JSON.stringify(places),
		});
	} catch (error) {
		console.error("Failed to save chat in database");
		throw error;
	}
}

export async function getItineraries(userId: string) {
	try {
		return await db
			.select()
			.from(itinerary)
			.where(eq(itinerary.userId, userId));
	} catch (error) {
		console.error("Failed to get initneraries from database");
		throw error;
	}
}

export async function getChatById({ id }: { id: string }) {
	try {
		const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
		return selectedChat;
	} catch (error) {
		console.error("Failed to get chat by id from database");
		throw error;
	}
}

export async function createReservation({
	id,
	userId,
	details,
}: {
	id: string;
	userId: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	details: any;
}) {
	return await db.insert(reservation).values({
		id,
		createdAt: new Date(),
		userId,
		hasCompletedPayment: false,
		details: JSON.stringify(details),
	});
}
export async function createBooking({
	id,
	userId,
	details,
}: {
	id: string;
	userId: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	details: any;
}) {
	return await db.insert(booking).values({
		id,
		createdAt: new Date(),
		userId,
		hasCompletedPayment: false,
		details: JSON.stringify(details),
	});
}

export async function getReservationById({ id }: { id: string }) {
	const [selectedReservation] = await db
		.select()
		.from(reservation)
		.where(eq(reservation.id, id));

	return selectedReservation;
}

export async function getBookingById({ id }: { id: string }) {
	const [selectedBooking] = await db
		.select()
		.from(booking)
		.where(eq(booking.id, id));

	return selectedBooking;
}

export async function updateReservation({
	id,
	hasCompletedPayment,
}: {
	id: string;
	hasCompletedPayment: boolean;
}) {
	return await db
		.update(reservation)
		.set({
			hasCompletedPayment,
		})
		.where(eq(reservation.id, id));
}

export async function updateBooking({
	id,
	hasCompletedPayment,
}: {
	id: string;
	hasCompletedPayment: boolean;
}) {
	return await db
		.update(booking)
		.set({
			hasCompletedPayment,
		})
		.where(eq(booking.id, id));
}
