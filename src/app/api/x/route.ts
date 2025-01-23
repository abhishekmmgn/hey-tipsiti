import { PlaceDataReturnType, PlaceType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { getId } from "@/lib/server-utils"

export async function GET(req: NextRequest) {
	// const cityId = "63590888";
	const activityId = "";

	const cityId = await getId("city", "boston");
	try {
		const response = await fetch("https://dato-gql-proxy.tipsiti.net/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `query AllPlaces($filter: PlaceModelFilter, $orderBy: PlaceModelOrderBy, $first: IntType, $skip: IntType) {
          allPlaces(filter: $filter, orderBy: [$orderBy], first: $first, skip: $skip) {
            id
            name
            description
            images {
              url
              alt
              title
            }
            city {
              id
              name
            }
            placeCategory {
              name
              key
            }
            location {
              latitude
              longitude
            }
          }
          _allPlacesMeta(filter: $filter) {
            count
          }
        }`,
				variables: {
					filter: {
						city: {
							eq: cityId,
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
						// ...(activityId && {
						// 	placeCategory: {
						// 		eq: activityId,
						// 	},
						// }),
						timeRating: { neq: "144344413" },
						visibility: { notIn: ["144298937", "148478186"] },
						_isValid: {
							eq: true,
						},
					},
					orderBy: "updatedAt_DESC",
					first: 6,
					skip: 0,
				},
			}),
		});

		// only need, name, images[].url, priceRange.name, placeCategory.name, description, city,
		const result = await response.json();

		console.log(result);
		if (result.errors) {
			return Response.json({ data: "Something went wrong" });
		}
		return Response.json({ data: result.data.allPlaces[0] });

		const places: PlaceType[] = [];
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

		return Response.json({ data: places });
	} catch (error: unknown) {
		console.log(error);
		return Response.json({ data: "Error" });
	}
}
