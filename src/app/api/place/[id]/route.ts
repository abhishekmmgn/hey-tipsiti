import { TIPSITI_API } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const placeId = "";
	const cityId = "";
	try {
		const response = await fetch(TIPSITI_API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `query GetPlaceById($id: ID!) {
  place(id: $id) {
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
						place: {
							eq: placeId,
						},
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

		const result = await response.json();
		if (result.errors) {
			return Response.json({ data: "Something went wrong" });
		}
		return Response.json({ data: result });
	} catch (error: unknown) {
		console.log(error);
		return Response.json({ data: "Error" });
	}
}
