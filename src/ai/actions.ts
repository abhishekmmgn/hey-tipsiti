"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { geminiFlashModel } from ".";
import {
	citiesInCountryQuery,
	placesInCityQuery,
} from "@/lib/queries-and-variables";
import type { PlaceDataReturnType, PlaceType } from "@/lib/types";
import { fetcher, getId } from "@/lib/server-utils";

export async function getCitiesInACountry(
	countryName: string,
): Promise<Array<{ id: string; name: string }> | string> {
	const id = await getId("country", countryName);
	try {
		const response = await fetcher(citiesInCountryQuery, {
			filter: {
				country: { eq: id },
			},
		});
		const result = await response.json();
		return result.data.allCities;
	} catch (error: unknown) {
		console.log(error);
		return "Failed to fetch data";
	}
}

export async function getPlacesInACountry(
	countryName: string,
	activityName?: string,
): Promise<string | PlaceType[]> {
	try {
		const data = await getCitiesInACountry(countryName);
		if (typeof data === "string") return "Failed to get the cities";

		const allPlaces: PlaceType[] = [];
		console.log("--------------------------------------");
		console.log(`Cities are: ${data}`);
		await Promise.all(
			data.map(async (city) => {
				const data = await getPlaces({
					cityId: city.id,
					cityName: city.name,
					activityName,
				});
				console.log(`data in getPlaces in country: ${data}`);
				if (typeof data !== "string") {
					// Use spread operator to add all items from data
					allPlaces.push(...data);
					console.log("Added places to array");
					console.log("--------------------------------------");
				}
			}),
		);
		console.log(`All places: ${allPlaces[0]}`);
		return allPlaces;
	} catch (error: unknown) {
		console.log(error);
		return "Failed to get the places";
	}
}

export async function getPlacesInACity(
	cityName: string,
	countryName: string,
	activityName?: string,
): Promise<PlaceType[] | string> {
	const data = await getCitiesInACountry(countryName);
	if (typeof data === "string") {
		const places = await getPlaces({
			cityName,
			activityName,
		});
		return places;
	}
	// console.log(data);
	const city = data.filter(
		(city: { name: string; id: string }) =>
			city.name.toLowerCase() === cityName.toLowerCase(),
	);
	if (city.length === 0) {
		console.log("City not found");
		return "City not found";
	}
	const places = await getPlaces({
		cityId: city[0].id,
		cityName,
		activityName,
	});
	// console.log(places);
	return places;
}

export async function getPlaces({
	cityName,
	cityId,
	activityName,
}: { cityName?: string; cityId?: string; activityName?: string }): Promise<
	string | PlaceType[]
> {
	let ctyId = "";
	let aId = "";

	if (!cityId && !cityName && !activityName) {
		return "Atleast provide arguments.";
	}
	console.log(cityId, cityName, activityName);

	if (cityId) {
		console.log("In city id");
		ctyId = cityId;
	} else if (cityName) {
		console.log("searching name...");
		ctyId = await getId("city", cityName.toLowerCase());
	}
	console.log(`city id is ${ctyId}`);

	if (activityName) {
		aId = await getId("acitivity", activityName.toLowerCase());
	}
	const variables = {
		filter: {
			city: {
				eq: ctyId,
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
			...(aId && {
				placeCategory: {
					eq: aId,
				},
			}),
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
	// city name given, not, activity given, not 4 total cases.
	try {
		const response = await fetcher(placesInCityQuery, variables);

		const result = await response.json();
		if (result.errors) {
			console.error(result.errors);
			return "Failed to get the places";
		}
		const places: PlaceType[] = [];

		// console.log("Result from getPlaces(): ", result);
		// console.log("Result.data: ", result.data.allPlaces[0]);
		result.data.allPlaces.map((place: PlaceDataReturnType) =>
			places.push({
				id: place.id,
				name: place.name,
				description: place.description,
				image: place.images[0].url,
				city: {
					id: place.city.id,
					name: place.city.name,
				},
				placeCategory: place.placeCategory?.name,
			}),
		);
		console.log(places);
		return places;
	} catch (error: unknown) {
		console.error("Error: ", error);
		return "Failed to get the places";
	}
}

export async function generateSampleFlightStatus({
	flightNumber,
	date,
}: {
	flightNumber: string;
	date: string;
}) {
	const { object: flightStatus } = await generateObject({
		model: geminiFlashModel,
		prompt: `Flight status for flight number ${flightNumber} on ${date}`,
		schema: z.object({
			flightNumber: z.string().describe("Flight number, e.g., BA123, AA31"),
			departure: z.object({
				cityName: z.string().describe("Name of the departure city"),
				airportCode: z.string().describe("IATA code of the departure airport"),
				airportName: z.string().describe("Full name of the departure airport"),
				timestamp: z.string().describe("ISO 8601 departure date and time"),
				terminal: z.string().describe("Departure terminal"),
				gate: z.string().describe("Departure gate"),
			}),
			arrival: z.object({
				cityName: z.string().describe("Name of the arrival city"),
				airportCode: z.string().describe("IATA code of the arrival airport"),
				airportName: z.string().describe("Full name of the arrival airport"),
				timestamp: z.string().describe("ISO 8601 arrival date and time"),
				terminal: z.string().describe("Arrival terminal"),
				gate: z.string().describe("Arrival gate"),
			}),
			totalDistanceInMiles: z
				.number()
				.describe("Total flight distance in miles"),
		}),
	});

	return flightStatus;
}

export async function generateSampleFlightSearchResults({
	origin,
	destination,
}: {
	origin: string;
	destination: string;
}) {
	const { object: flightSearchResults } = await generateObject({
		model: geminiFlashModel,
		prompt: `Generate search results for flights from ${origin} to ${destination}, limit to 4 results`,
		output: "array",
		schema: z.object({
			id: z
				.string()
				.describe("Unique identifier for the flight, like BA123, AA31, etc."),
			departure: z.object({
				cityName: z.string().describe("Name of the departure city"),
				airportCode: z.string().describe("IATA code of the departure airport"),
				timestamp: z.string().describe("ISO 8601 departure date and time"),
			}),
			arrival: z.object({
				cityName: z.string().describe("Name of the arrival city"),
				airportCode: z.string().describe("IATA code of the arrival airport"),
				timestamp: z.string().describe("ISO 8601 arrival date and time"),
			}),
			airlines: z.array(
				z.string().describe("Airline names, e.g., American Airlines, Emirates"),
			),
			priceInUSD: z.number().describe("Flight price in US dollars"),
			numberOfStops: z.number().describe("Number of stops during the flight"),
		}),
	});

	return { flights: flightSearchResults };
}

export async function generateSampleSeatSelection({
	flightNumber,
}: {
	flightNumber: string;
}) {
	const { object: rows } = await generateObject({
		model: geminiFlashModel,
		prompt: `Simulate available seats for flight number ${flightNumber}, 6 seats on each row and 5 rows in total making 30 total seats, adjust pricing based on location of seat. Make sure some seats for each row are already booked.`,
		output: "array",
		schema: z.array(
			z.object({
				seatNumber: z.string().describe("Seat identifier, e.g., 12A, 15C"),
				priceInUSD: z
					.number()
					.describe("Seat price in US dollars, less than $99"),
				isAvailable: z.boolean().describe("Seat availability status"),
			}),
		),
	});

	return { seats: rows[0] };
}

export async function generateReservationPrice(props: {
	seats: string[];
	flightNumber: string;
	departure: {
		cityName: string;
		airportCode: string;
		timestamp: string;
		gate: string;
		terminal: string;
	};
	arrival: {
		cityName: string;
		airportCode: string;
		timestamp: string;
		gate: string;
		terminal: string;
	};
	passengerName: string;
}) {
	const { object: reservation } = await generateObject({
		model: geminiFlashModel,
		prompt: `Generate price for the following reservation \n\n ${JSON.stringify(props, null, 2)}`,
		schema: z.object({
			totalPriceInUSD: z
				.number()
				.describe("Total reservation price in US dollars"),
		}),
	});

	return reservation;
}

export async function generateSampleHotelsSearchResults({
	city,
}: {
	city: string;
}) {
	const { object: hotelsSearchResults } = await generateObject({
		model: geminiFlashModel,
		prompt: `Generate search results for hotels in ${city}, limit to 5 results`,
		output: "array",
		schema: z.object({
			id: z
				.string()
				.describe("Unique identifier for the hotel, like HA123, HA31, etc."),
			hotelName: z
				.string()
				.describe(
					"Name of the hotel. Consider local language of the city for the name.",
				),
			location: z
				.string()
				.describe(
					"Location of the hotel, place and the city like XYZ Street, Brooklyn, New York",
				),
			specs: z
				.string()
				.describe(
					"Special features in the hotel, like Infinity view pool, sea-facing rooms, etc",
				),
			priceInUSD: z.number().describe("Hotel price in US dollars"),
			reviews: z.number().describe("Rating of the hotel. Out of 5."),
		}),
	});

	return { hotels: hotelsSearchResults };
}

export async function generateSampleRoomsSelection({
	hotelId,
}: {
	hotelId: string;
}) {
	const { object: rows } = await generateObject({
		model: geminiFlashModel,
		prompt: `Simulate available rooms for hotel with id ${hotelId}, 5 total variants of the room, adjust pricing based on the room`,
		output: "array",
		schema: z.array(
			z.object({
				roomNumber: z.string().describe("Room number, e.g., 12A, 15C etc"),
				roomDetails: z
					.string()
					.describe(
						"Features like, 3 beds, 2 bathroom or 1 bed, 1 bathroom, sea-facing view, etc.",
					),
				priceInUSD: z
					.number()
					.describe("Room cost in US dollars, between $99 to $1999"),
				availableRooms: z
					.number()
					.describe("Number of rooms available of this type"),
			}),
		),
	});

	return { rooms: rows[0] };
}

export async function generateBookingPrice(props: {
	hotelName: string;
	location: string;
	guestName: string;
	roomNumber: string;
	roomDetails: string;
}) {
	const { object: booking } = await generateObject({
		model: geminiFlashModel,
		prompt: `Generate price for the following booking \n\n ${JSON.stringify(props, null, 2)}`,
		schema: z.object({
			totalPriceInUSD: z.number().describe("Total booking price in US dollars"),
		}),
	});

	return booking;
}
