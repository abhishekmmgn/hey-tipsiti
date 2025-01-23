"use server";

import {
	citiesInCountryQuery,
	placesInCityQuery,
} from "@/lib/queries-and-variables";
import { PlaceDataReturnType, PlaceType } from "@/lib/types";
import { fetcher, getId } from "@/lib/server-utils";

export async function getCitiesInACountry(
	countryName: string,
) {
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
		return { error: "Failed to fetch data" };
	}
}

export async function getPlacesInACountry(
	countryName: string,
	activityName?: string,
): Promise<string | PlaceType[]> {
	try {
		const cities: {
			id: string;
			name: string;
		}[] = await getCitiesInACountry(countryName);

		const allPlaces: PlaceType[] = [];
		console.log("--------------------------------------")
		console.log(`Cities are: ${cities}`)
		await Promise.all(cities.map(async (city) => {
			const data = await getPlaces(city.name, city.id, activityName);
			console.log(`data in getPlaces in country: ${data}`);
			if (typeof data !== "string") {
				// Use spread operator to add all items from data
				allPlaces.push(...data);
				console.log("Added places to array")
				console.log("--------------------------------------")
			}
		}));
		console.log(`All places: ${allPlaces[0]}`)
		return allPlaces;
	} catch (error: unknown) {
		console.log(error);
		return "Failed to get the places";
	}
}

export async function getPlaces(
	cityName?: string,
	cityId?: string,
	activityName?: string,
): Promise<string | PlaceType[]> {
	if (!cityId && !cityName && !activityName) {
		return "Atleast provide arguments.";
	}
	console.log(cityId, cityName, activityName);
	let ctyId;
	if (cityId) {
		console.log("In city id")
		ctyId = cityId
	} else if (cityName) {
		console.log("searching name...")
		ctyId = await getId("city", cityName.toLowerCase());
	}
	console.log(`city id is ${ctyId}`)
	let aId;
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
		console.log(places)
		return places;
	} catch (error: unknown) {
		console.error("Error: ", error);
		return "Failed to get the places";
	}
}
// get places by activities. don't take cities into consideration.
// export async function getLocalsInACity(cityName: string, cityId?: string) { }

// export async function getProductsinACity(name: string, cityId?: string) {}

// flights
// hotels or stays


