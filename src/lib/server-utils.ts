"use server";

import { activityIds, countryIds } from "@/lib/ids";
import { cityIdQuery, placeIdQuery } from "@/lib/queries-and-variables";
import type { TipsitiItemType } from "@/lib/types";

export async function fetcher(query: string, variables: {}) {
	return await fetch("https://dato-gql-proxy.tipsiti.net/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});
}

export async function getId(
	type: TipsitiItemType,
	name: string,
): Promise<string> {
	const ITEM_TYPE = type.toLowerCase();

	let id = "";

	console.log(name, ITEM_TYPE);

	if (ITEM_TYPE === "country") {
		const country = countryIds.filter(
			(country) => country.name.toLowerCase() === name?.toLowerCase(),
		);
		id = country[0].id;
	} else if (ITEM_TYPE === "acitivity") {
		const activity = activityIds.filter(
			(activity) => activity.name.toLowerCase() === name?.toLowerCase(),
		);
		id = activity[0].id;
	} else {
		const query = ITEM_TYPE === "city" ? cityIdQuery : placeIdQuery;
		try {
			const response = await fetcher(query, {
				filter: {
					name: {
						eq: name,
					},
				},
			});
			const result = await response.json();
			console.log("result: ", result.data.allCities);
			const data: Array<{
				id: string;
				name: string;
			}> = ITEM_TYPE === "city" ? result.data.allCities : result.data.allPlaces;
			const filteredCity = data.filter(
				(city) => city.name.toLowerCase() === name.toLowerCase(),
			);
			id = filteredCity[0].id;
		} catch (error) {
			console.log(error);
		}
	}
	console.log("Id is ", id);
	return id;
}
