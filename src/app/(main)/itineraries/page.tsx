import ItineraryCard from "@/components/itinerary-card";
import { getItineraries } from "@/db/queries";
import createClientForServer from "@/lib/supabase/server";
import type {
	BoardingPass,
	HotelConfirmationType,
	PlaceType,
} from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
	const supabase = await createClientForServer();
	const user = await supabase.auth.getUser();

	if (user.error) {
		redirect("/login");
	}

	const itineraries = await getItineraries(user.data.user.id);
	return (
		<main className="w-full max-w-screen-lg mx-auto space-y-6">
			<h2>Itineraries</h2>
			{itineraries.length === 0 ? (
				<div className="pt-20 w-full h-full grid place-items-center text-center">
					<p>No itineraries found.</p>
				</div>
			) : (
				<div className="grid gap-6">
					{itineraries.map((itinerary) => (
						<Link
							href={`/itineraries/${itinerary.id}`}
							key={itinerary.id}
							className="w-full"
						>
							<ItineraryCard
								id={itinerary.id}
								name={itinerary.name}
								description={itinerary.description}
								places={(itinerary.places as PlaceType[]).map(
									(place) => place.name,
								)}
								hotels={(itinerary.bookings as HotelConfirmationType[]).map(
									(hotel) => hotel.hotelName,
								)}
								flights={(itinerary.reservations as BoardingPass[]).map(
									(flight) =>
										`${flight.departure.cityName} -> ${flight.arrival.cityName}`,
								)}
							/>
						</Link>
					))}
				</div>
			)}
		</main>
	);
}
