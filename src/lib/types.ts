export type Budget = "cheap" | "okay" | "expensive";
export type TipsitiItemType = "place" | "city" | "country" | "acitivity";
export type WidgetType = "flights" | "hotels" | TipsitiItemType;

export interface PlaceDataReturnType {
	id: string;
	name: string;
	description: string;
	images: Array<{ url: string; alt: string; title: string }>;
	city: {
		id: string;
		name: string;
	};
	placeCategory?: {
		name: string;
		key: string;
	};
	location: {
		latitude: string;
		longitude: string;
	};
}

export interface ActivityDataReturnType extends PlaceDataReturnType {}

export interface DataIdentityType {
	id: string;
	name: string;
	key?: string;
}

export type ItemCardType = {
	id: string;
	name: string;
	description: string;
	image: string;
	city: string;
	placeCategory?: string;
	curatorName?: string;
};

export type LangType = "en" | "de" | "es" | "fr";

export type PlaceType = {
	id: string;
	name: string;
	description: string;
	image: string;
	city: {
		id: string;
		name: string;
	};
	placeCategory?: string;
};

export type PlaceCardType = {
	id: string;
	name: string;
	image: string;
	cities: number;
	places: number;
	flights: number;
	hotels: number;
};

export type HotelCardType = {
	id: string;
	location: string;
	hotelName: string;
	priceInUSD: number;
	reviews: number;
	specs: string;
};
