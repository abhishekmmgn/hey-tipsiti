import ItemCard from "@/components/trip/item-card";
import { placesInCityQuery } from "@/lib/queries-and-variables";
import { fetcher } from "@/lib/server-utils";
import type { ItemCardType, PlaceDataReturnType } from "@/lib/types";
import HomePagination from "./home-pagination";

async function getPlaces(
	skip: number,
): Promise<{ error: string } | { data: ItemCardType[] }> {
	const LENGTH = 18;
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
		first: LENGTH,
		skip: (skip - 1) * LENGTH,
	};
	try {
		const response = await fetcher(placesInCityQuery, variables);

		const result = await response.json();
		if (result.errors) {
			console.error(result.errors);
			return { error: "Failed to get the places" };
		}
		const places: ItemCardType[] = [];

		// console.log("Result from getPlaces(): ", result);
		// console.log("Result.data: ", result.data.allPlaces[0]);
		result.data.allPlaces.map((place: PlaceDataReturnType) =>
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
		return { data: places };
	} catch (error: unknown) {
		console.error("Error: ", error);
		return { error: "Failed to get the places" };
	}
}

export default async function HomeSection({ page }: { page: string }) {
	const data = await getPlaces(+page);

	if ("error" in data) {
		return <p className="text-tertiary-foreground">Fetch failed</p>;
	}
	return (
		<div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{data.data.map((item) => (
				<ItemCard {...item} key={item.id} />
			))}
			<HomePagination />
		</div>
	);
}
