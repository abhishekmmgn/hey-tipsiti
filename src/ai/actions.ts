"use server";

import { activityIds, countryIds } from "@/lib/ids";
import {
  citiesInCountryQuery,
  cityIdQuery,
  placeIdQuery,
  placesInCityQuery,
} from "@/lib/queries-and-variables";
import { PlaceDataReturnType, PlaceType, TipsitiItemType } from "@/lib/types";
import { generateObject } from "ai";
import { geminiFlashModel } from ".";
import { z } from "zod";

export async function getCitiesInACountry(countryName: string, countryId?: string) {
  const id = countryId ?? await getId("country", countryName);
  console.log(`${id} is the id of ${countryName.toLowerCase()}`);
  try {
    const response = await fetcher(
      citiesInCountryQuery,
      {
        filter: {
          country: { eq: id },
        },
      }
    );
    const result = await response.json();
    console.log(result.data.allCities[0]);
    return result.data.allCities;
  } catch (error: unknown) {
    console.log(error);
    return { error: "Failed to fetch data" };
  }
}

export async function getPlacesInACountry(countryName: string, countryId?: string, activityName?: string): Promise<string | PlaceType[]> {
  try {
    const cities: {
      id: string;
      name: string;
    }[] = await getCitiesInACountry(countryName, countryId)
    const allPlaces: PlaceType[] = [];
    cities.map(async (city) => {
      const data = await getPlaces(city.name, city.id, activityName);
      if (typeof data !== "string") {
        allPlaces.push(...data);
      }
    })
    return allPlaces;
  } catch (error: unknown) {
    console.log(error);
    return "Failed to get the places";
  }
}

export async function getPlaces(cityName?: string, cityId?: string, activityName?: string): Promise<string | PlaceType[]> {
  if (!cityId && !cityName && !activityName) {
    return "Atleast provide arguments."
  }
  console.log
  let ctyId;
  if (cityName) {
    ctyId = cityId ?? await getId("city", cityName.toLowerCase());
  }
  let aId;
  if (activityName) {
    aId = await getId("acitivity", activityName.toLowerCase());
  }

  const variables = {
    filter: {
      city: {
        ...(ctyId && {
          eq: ctyId
        }
        ),
        notIn: ["147475710", "148020210", "167532193", "167488320", "82391175", "167791122", "141473787", "147475736",]
      },
      ...(aId && {
        placeCategory: {
          eq: aId
        }
      }),
      timeRating: { neq: "144344413" },
      visibility: { notIn: ["144298937", "148478186"] },
      _isValid: {
        eq: true,
      },
    },
    orderBy: "updatedAt_DESC",
    first: 6,
    skip: 0,
  }
  // city name given, not, activity given, not 4 total cases.
  try {
    const response = await fetcher(placesInCityQuery, variables);

    const result = await response.json();
    if (result.errors) {
      return "Failed to get the places"
    }
    const places: PlaceType[] = []

    result.data.allPlaces.map((place: PlaceDataReturnType) => places.push(
      {
        id: place.id,
        name: place.name,
        description: place.description,
        image: place.images[0].url,
        city: {
          id: place.city.id,
          name: place.city.name,
        },
        placeCategory: place.placeCategory?.name
      }
    ))
    return places;

  } catch (error: unknown) {
    return "Failed to get the places";
  }
}
// export async function getLocalsInACity(cityName: string, cityId?: string) { }

// export async function getProductsinACity(name: string, cityId?: string) {}

// flights
// hotels or stays

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

async function getId(type: TipsitiItemType, name: string): Promise<string> {
  const ITEM_TYPE = type.toLowerCase();
  const API_URL = "https://dato-gql-proxy.tipsiti.net/";
  let id = "";

  console.log(name);

  if (ITEM_TYPE === "city" || ITEM_TYPE === "place") {
    const query = ITEM_TYPE === "city" ? cityIdQuery : placeIdQuery;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          filter: {
            name: {
              eq: name,
            },
          },
        },
      }),
    });
    const result = await response.json();
    id =
      ITEM_TYPE === "city"
        ? result.data.allCities[0].id
        : result.data.allPlaces[0].id;
  }
  if (ITEM_TYPE === "country") {
    const country = countryIds.filter(
      (country) => country.name.toLowerCase() === name?.toLowerCase()
    );
    id = country[0].id;
  }
  if (ITEM_TYPE === "acitivity") {
    const activity = activityIds.filter(
      (activity) => activity.name.toLowerCase() === name?.toLowerCase()
    );
    id = activity[0].id;
  }

  return id;
}