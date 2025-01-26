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

export type HotelCardType = {
	id: string;
	location: string;
	hotelName: string;
	priceInUSD: number;
	reviews: number;
	specs: string;
};

export type HotelConfirmationType = {
	roomNumber: string;
	hotelName: string;
	location: string;
	roomDetails: string;
};

export type AirportDetails = {
	cityName: string;
	airportCode: string;
	airportName: string;
	timestamp: string;
	terminal: string;
	gate: string;
};
export type BoardingPass = {
	reservationId: string;
	flightNumber: string;
	seats: string[];
	departure: AirportDetails;
	arrival: AirportDetails;
	passengerName: string;
};
