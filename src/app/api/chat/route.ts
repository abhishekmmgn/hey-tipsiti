import { convertToCoreMessages, type Message, streamText, tool } from "ai";
import { z } from "zod";
import { geminiProModel } from "@/ai";
import {
	getCitiesInACountry,
	getPlacesInACountry,
	generateReservationPrice,
	generateSampleFlightSearchResults,
	generateSampleFlightStatus,
	generateSampleSeatSelection,
	getPlacesInACity,
	generateSampleHotelsSearchResults,
	generateBookingPrice,
	generateSampleRoomsSelection,
} from "@/ai/actions";
import { activities } from "@/lib/constants";
import {
	createBooking,
	createReservation,
	getBookingById,
	getReservationById,
	saveChat,
} from "@/db/queries";
import { generateUUID } from "@/lib/utils";
import createClientForServer from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
	const { id, messages }: { id: string; messages: Array<Message> } =
		await request.json();

	const coreMessages = convertToCoreMessages(messages).filter(
		(message) => message.content.length > 0,
	);

	const supabase = await createClientForServer();
	const userResponse = await supabase.auth.getUser();

	if (!userResponse.data.user) {
		redirect("/login");
	}

	const userId = userResponse.data.user.id;

	const result = await streamText({
		model: geminiProModel,
		system: `\n
    You are a help assisant to help users plan their trips. You've to reply in whichever language they're prompting. Keep your responses limited to a sentence and do not output list.
    Here's the optimal flow
      - ask for the city or country they want to visit
      - ask for the duration of the trip and the dates
      - show places the user can visit in that city/cities user wants to visit.
      - suggest activities/interests to explore. Here are these ${activities}. Do not add activities on your own. Always use the provided activities.
      - display the summary of the places they've chosen
      - When city is final, ask their boarding city and show the flights.
      - Also ask if they want suggestions for the hotels in the destination city.
      - If the user is breaking the flow, let it break.
    - After every tool call, if it is required, pretend you're showing the summary of the result to the user and keep your response limited to a phrase.
    - Today's date is ${new Date().toLocaleDateString()}.
    - Ask follow up questions to nudge user into the optimal flow
    - Make sure to match the relevant names when giving the arguments, like if the user typed 'parise' instead of paris or barcelona instead of Barcelona, send the correct name as the argument to the tools.
    - while passing argument if the name of the activity is more than a letter long format it like this: arts and culture -> arts-and-culture, but if the name is country, separate only by space united states -> united states. Also convert them to lowercase as well.
    - Intelligently guess if it is a city or a country or a place or activity and then use the right tool for the job.
    - When user has finalized the cities ask it for flights and hotels reservation.
    - While booking flights:
      - ask for any details you don't know, like name of passenger, etc.'
      - C and D are aisle seats, A and F are window seats, B and E are middle seats
      - assume the most popular airports for the origin and destination
      - here's the optimal flow
      - search for flights
      - choose flight
      - select seats
      - create reservation (take confirmation too)
      - authorize payment (requires user consent, wait for user to finish payment and let you know when done)
      - display boarding pass (DO NOT display boarding pass without verifying payment)
	- While doing hotel reservation:
      - ask for any details you don't know, like name of person, etc.'
      - here's the optimal flow
      - search for hotels
      - choose hotel
      - select rooms
      - book the room (take confirmation as well)
      - authorize payment (requires user consent, wait for user to finish payment and let you know when done)
      - display reciept (DO NOT display reciept without verifying payment)
  `,
		messages: coreMessages,
		tools: {
			getPlacesInACity: {
				description:
					"Get places to visit in a city. Optionally filter by activities.",
				parameters: z.object({
					cityName: z.string().describe("Name of the city"),
					countryName: z.string().describe("Name of the country"),
					activityName: z
						.string()
						.describe("Activities user can do.")
						.optional(),
				}),
				execute: async ({ cityName, countryName, activityName }) => {
					const places = await getPlacesInACity(
						cityName,
						countryName,
						activityName,
					);
					if (typeof places === "string") {
						return "Can't find the places. But you can find cities to visit in the country.";
					}
					return places;
				},
			},
			getCitiesInACountry: {
				description: "Get cities to visit in a country. Does not offer places.",
				parameters: z.object({
					countryName: z
						.string()
						.describe(
							"Name of the country. For country with names with more than 1 word, like US or UK, the name is United State or United Kingdom etc.",
						),
				}),
				execute: async ({ countryName }) => {
					const data = await getCitiesInACountry(countryName);

					if (typeof data === "string") {
						return "Can't find the cities. But you can find places to visit in the country.";
					}
					return data.map((city) => city.name);
				},
			},
			getPlacesInACountry: {
				description:
					"Get places to visit in a country. Optionally filter by activities.",
				parameters: z.object({
					countryName: z
						.string()
						.describe(
							"Name of the country. For country with names with more than 1 word, like US or UK, the name is United State or United Kingdom etc.",
						),
					activityName: z
						.string()
						.describe("Activities user can do.")
						.optional(),
				}),
				execute: async ({ countryName, activityName }) => {
					const places = await getPlacesInACountry(countryName, activityName);
					return places;
				},
			},
			getWeather: {
				description: "Get the current weather at a location",
				parameters: z.object({
					latitude: z.number().describe("Latitude coordinate"),
					longitude: z.number().describe("Longitude coordinate"),
				}),
				execute: async ({ latitude, longitude }) => {
					const response = await fetch(
						`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
					);

					const weatherData = await response.json();
					return weatherData;
				},
			},
			displayFlightStatus: {
				description: "Display the status of a flight",
				parameters: z.object({
					flightNumber: z.string().describe("Flight number"),
					date: z.string().describe("Date of the flight"),
				}),
				execute: async ({ flightNumber, date }) => {
					const flightStatus = await generateSampleFlightStatus({
						flightNumber,
						date,
					});

					return flightStatus;
				},
			},
			findHotels: {
				description: "Search for hotels based on the given parameters",
				parameters: z.object({
					city: z.string().describe("City"),
				}),
				execute: async ({ city }) => {
					const results = await generateSampleHotelsSearchResults({
						city,
					});

					return results;
				},
			},
			selectRooms: {
				description: "Select room",
				parameters: z.object({
					hotelId: z.string().describe("Unique id of the hotel"),
				}),
				execute: async ({ hotelId }) => {
					const rooms = await generateSampleRoomsSelection({ hotelId });
					return rooms;
				},
			},
			createBooking: {
				description: "Display pending hotel booking details",
				parameters: z.object({
					hotelName: z.string().describe("Name of the hotel"),
					location: z.string().describe("Location of the hotel"),
					guestName: z.string().describe("Name of the guest"),
					roomDetails: z.string().describe("Details of the room"),
					roomNumber: z.string().describe("Room number"),
				}),
				execute: async (props) => {
					const { totalPriceInUSD } = await generateBookingPrice(props);
					const id = generateUUID();
					await createBooking({
						id,
						userId,
						details: { ...props, totalPriceInUSD },
					});

					return { id, ...props, totalPriceInUSD };
				},
			},
			displayBookingReciept: {
				description: "Display a receipt of the booking",
				parameters: z.object({
					id: z.string().describe("Unique identifier for the booking"),
					guestName: z.string().describe("Name of the guest, in title case"),
					roomNumber: z.string().describe("Room Number"),
					hotelName: z.string().describe("Name of the hotel, in title case"),
					location: z
						.string()
						.describe("Location of the hotel, place and the city"),
					roomDetails: z
						.string()
						.describe("Details of the room, like 3BHK, pool, etc"),
				}),
				// make it
				execute: async ({ id }) => {
					const booking = await getBookingById({ id });
					return { booking };
				},
			},
			authorizePayment: {
				description:
					"User will enter credentials to authorize payment, wait for user to repond when they are done",
				parameters: z.object({
					id: z
						.string()
						.describe(
							"Unique identifier for the booking the hotel or flight reservation",
						),
					type: z.string().describe("Type of reservation: 'hotel' or 'flight'"),
				}),
				execute: async ({
					id,
					type,
				}: { id: string; type: "hotel" | "flight" }) => {
					return { id, type };
				},
			},
			verifyPayment: {
				description: "Verify payment status",
				parameters: z.object({
					id: z
						.string()
						.describe(
							"Unique identifier for the booking the hotel or flight reservation",
						),
					type: z.string().describe("Type: 'hotel' or 'flight'"),
				}),
				execute: async ({
					id,
					type,
				}: { id: string; type: "hotel" | "flight" }) => {
					const reservation =
						type === "hotel"
							? await getBookingById({ id })
							: await getReservationById({ id });

					if (reservation.hasCompletedPayment) {
						return { hasCompletedPayment: true };
					}
					return { hasCompletedPayment: false };
				},
			},
			searchFlights: {
				description: "Search for flights based on the given parameters",
				parameters: z.object({
					origin: z.string().describe("Origin airport or city"),
					destination: z.string().describe("Destination airport or city"),
				}),
				execute: async ({ origin, destination }) => {
					const results = await generateSampleFlightSearchResults({
						origin,
						destination,
					});

					return results;
				},
			},
			selectSeats: {
				description: "Select seats for a flight",
				parameters: z.object({
					flightNumber: z.string().describe("Flight number"),
				}),
				execute: async ({ flightNumber }) => {
					const seats = await generateSampleSeatSelection({ flightNumber });
					return seats;
				},
			},
			createReservation: {
				description: "Display pending reservation details",
				parameters: z.object({
					seats: z.string().array().describe("Array of selected seat numbers"),
					flightNumber: z.string().describe("Flight number"),
					departure: z.object({
						cityName: z.string().describe("Name of the departure city"),
						airportCode: z.string().describe("Code of the departure airport"),
						timestamp: z.string().describe("ISO 8601 date of departure"),
						gate: z.string().describe("Departure gate"),
						terminal: z.string().describe("Departure terminal"),
					}),
					arrival: z.object({
						cityName: z.string().describe("Name of the arrival city"),
						airportCode: z.string().describe("Code of the arrival airport"),
						timestamp: z.string().describe("ISO 8601 date of arrival"),
						gate: z.string().describe("Arrival gate"),
						terminal: z.string().describe("Arrival terminal"),
					}),
					passengerName: z.string().describe("Name of the passenger"),
				}),
				execute: async (props) => {
					const { totalPriceInUSD } = await generateReservationPrice(props);
					const id = generateUUID();
					await createReservation({
						id,
						userId,
						details: { ...props, totalPriceInUSD },
					});

					return { id, ...props, totalPriceInUSD };
				},
			},
			displayBoardingPass: {
				description: "Display a boarding pass",
				parameters: z.object({
					reservationId: z
						.string()
						.describe("Unique identifier for the reservation"),
					passengerName: z
						.string()
						.describe("Name of the passenger, in title case"),
					flightNumber: z.string().describe("Flight number"),
					seat: z.string().describe("Seat number"),
					departure: z.object({
						cityName: z.string().describe("Name of the departure city"),
						airportCode: z.string().describe("Code of the departure airport"),
						airportName: z.string().describe("Name of the departure airport"),
						timestamp: z.string().describe("ISO 8601 date of departure"),
						terminal: z.string().describe("Departure terminal"),
						gate: z.string().describe("Departure gate"),
					}),
					arrival: z.object({
						cityName: z.string().describe("Name of the arrival city"),
						airportCode: z.string().describe("Code of the arrival airport"),
						airportName: z.string().describe("Name of the arrival airport"),
						timestamp: z.string().describe("ISO 8601 date of arrival"),
						terminal: z.string().describe("Arrival terminal"),
						gate: z.string().describe("Arrival gate"),
					}),
				}),
				execute: async ({ reservationId }) => {
					const reservation = await getReservationById({ id: reservationId });
					return { boardingPass: reservation.details };
				},
			},
		},
		onFinish: async (res) => {
			try {
				await saveChat({
					id,
					messages: [...coreMessages, ...res.response.messages],
					userId,
				});
				console.log("----------------------------------------");
				console.log("chat saved");
				console.log("----------------------------------------");
			} catch (error) {
				console.log("----------------------------------------");
				console.log(error);
				console.error("Failed to save chat");
				console.log("----------------------------------------");
			}
		},
		experimental_telemetry: {
			isEnabled: true,
			functionId: "stream-text",
		},
	});

	return result.toDataStreamResponse();
}
