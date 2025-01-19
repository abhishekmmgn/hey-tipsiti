export type Budget = "cheap" | "okay" | "expensive";
export type TipsitiItemType =
  | "place"
  | "city"
  | "country"
  | "person"
  | "acitivity";
export type WidgetType = "flights" | "hotels" | TipsitiItemType;

export interface FlightsDataReturnType {
  id: string;
  boardingCity: string;
  boardingAirport: string;
  destinationAirport: string;
  destinationCity: string;
}

export interface HotelDataReturnType {
  id: string;
  name: string;
  location: string;
  price: number;
}

export interface ActivityDataReturnType extends PlaceDataReturnType { }

export interface DataReturnType {
  type: WidgetType;
  data:
  | FlightsDataReturnType
  | HotelDataReturnType
  | PlaceDataReturnType
  | ActivityDataReturnType;
}

export interface DataIdentityType {
  id: string;
  name: string;
  key?: string;
}

export interface TripCardType {
  uid: string;
  title: string;
  description: string;
  image: string;
  creator: {
    name: string;
    uid: string;
  }
}


export type LangType = 'en' | 'de' | "es" | "fr"


export interface PlaceDataReturnType {
  id: string,
  name: string,
  description: string,
  images: Array<{ url: string, alt: string, title: string }>
  city: {
    id: string
    name: string,
  },
  placeCategory?: {
    name: string;
    key: string;
  },
  location: {
    latitude: string;
    longitude: string;
  }
};

export interface PlaceType {
  id: string,
  name: string,
  description: string,
  image: string
  city: {
    id: string
    name: string,
  },
  placeCategory?: string
};