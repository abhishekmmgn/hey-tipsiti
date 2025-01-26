"use server";

import { getItineraryByChatId, saveItinerary } from "@/db/queries";
import createClientForServer from "./supabase/server";
import type { PlaceType } from "./types";
import { generateUUID } from "./utils";

export async function savePlace(chatId: string, place: PlaceType) {
	const supabase = await createClientForServer();
	const user = await supabase.auth.getUser();

	if (user.error) return { error: user.error };

	const id = generateUUID();

	const i = await getItineraryByChatId({ chatId });

	console.log(`i is ${i}`);

	if (i) {
		await saveItinerary({
			id: i.id,
			name: "",
			description: "",
			bookings: i.bookings,
			reservations: i.reservations,
			places: [...(i.places as PlaceType[]), place],
			chatId,
			userId: user.data.user.id,
		});
	} else {
		await saveItinerary({
			id,
			places: [place],
			bookings: [],
			reservations: [],
			name: "",
			description: "",
			chatId,
			userId: user.data.user.id,
		});
	}
}
