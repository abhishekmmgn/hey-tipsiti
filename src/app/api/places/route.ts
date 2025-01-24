import { placesInCityQuery } from "@/lib/queries-and-variables";
import { fetcher } from "@/lib/server-utils";
import type { PlaceType, PlaceDataReturnType, ItemCardType } from "@/lib/types";

export async function GET(req: Request) {
	const variables = {
		filter: {
			city: {
				notIn: [
					"147475710",
					"148020210",
					"167532193",
					"167488320",
					"82391175",
					"167791122",
					"141473787",
					"147475736",
				],
			},
			timeRating: { neq: "144344413" },
			visibility: { notIn: ["144298937", "148478186"] },
			_isValid: {
				eq: true,
			},
		},
		orderBy: "updatedAt_DESC",
		first: 50,
		skip: 0,
	};
	try {
		const response = await fetcher(placesInCityQuery, variables);

		const result = await response.json();
		if (result.errors) {
			console.error(result.errors);
			return Response.json({ error: "Failed to get the places" });
		}
		const places: ItemCardType[] = [];

		// console.log("Result from getPlaces(): ", result);
		console.log("Result.data: ", result.data.allPlaces[0]);
		result.data.allPlaces.slice(18).map((place: PlaceDataReturnType) =>
			places.push({
				id: place.id,
				name: place.name,
				description: place.description,
				image: place.images[0].url,
				city: place.city.name,
				placeCategory: place.placeCategory?.name,
			}),
		);
		// console.log(places);
		return Response.json({ data: places });
	} catch (error: unknown) {
		console.error("Error: ", error);
		return Response.json({ error: "Failed to get the places" });
	}
}
