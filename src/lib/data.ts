import { PlaceType } from "./types";

export const places: PlaceType[] = [
    {
        id: "p1",
        name: "Eiffel Tower",
        description: "Iconic iron lattice tower on the Champ de Mars in Paris, France. Built in 1889, it's one of the world's most recognizable landmarks.",
        image: "eiffel-tower-day.jpg",
        city: {
            id: "123",
            name: "France",
        },
        placeCategory: "landmarks"
    },
    {
        id: "p2",
        name: "Central Park",
        description: "Vast urban oasis in the heart of Manhattan, featuring walking trails, lakes, and various recreational facilities.",
        image: "eiffel-tower-day.jpg",
        city: {
            id: "nyc-01",
            name: "New York City"
        },
        placeCategory: "parks"
    },
    {
        id: "p3",
        name: "Colosseum",
        description: "Ancient amphitheater in the heart of Rome, built in the 1st century AD. A marvel of Roman engineering and architecture.",
        image: "eiffel-tower-day.jpg",
        city: {
            id: "rome-01",
            name: "Rome"
        },
        placeCategory: "historical"
    },
    {
        id: "p4",
        name: "Bondi Beach",
        description: "Famous beach known for its golden sand, clear water, and excellent surfing conditions. Popular among locals and tourists alike.",
        image: "eiffel-tower-day.jpg",
        city: {
            id: "syd-01",
            name: "Sydney"
        },
        placeCategory: "beaches"
    },
    {
        id: "p5",
        name: "Sensoji Temple",
        description: "Ancient Buddhist temple in Asakusa. Tokyo's oldest temple, featuring iconic red lanterns and traditional architecture.",
        image: "eiffel-tower-day.jpg",
        city: {
            id: "tokyo-01",
            name: "Tokyo"
        },
        placeCategory: "temples"
    }
];