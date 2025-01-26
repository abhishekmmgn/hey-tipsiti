import { redirect } from "next/navigation";
import ItineraryCard from "@/components/itinerary-card";
import { getItineraries, getItinerary } from "@/db/queries";
import createClientForServer from "@/lib/supabase/server";
import type {
	BoardingPass,
	HotelConfirmationType,
	PlaceType,
} from "@/lib/types";
import Link from "next/link";
import PlaceCard from "@/components/trip/place-card";
import { DisplayBoardingPass } from "@/components/flights/boarding-pass";
import { DisplayReceipt } from "@/components/hotels/display-reciept";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
	const supabase = await createClientForServer();
	const user = await supabase.auth.getUser();

	if (user.error) {
		redirect("/login");
	}

	const { id } = await params;
	const itinerary = await getItinerary({ id });
	if (!itinerary) {
		return <p>Itinerary not found</p>;
	}
	return (
		<main className="w-full max-w-screen-lg mx-auto default-gap">
			<section>
				<h1>{itinerary.name}</h1>
				<p className="mt-2 mb-4 sm:text-lg text-tertiary-foreground">
					{itinerary.description}
				</p>
				<Separator />
			</section>
			<section className="space-y-4">
				<h2>Places</h2>
				<div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{(itinerary.places as PlaceType[]).map((place: PlaceType) => (
						<PlaceCard key={place.id} {...place} isChatUI={false} />
					))}
				</div>
			</section>
			<section className="space-y-4">
				<h2>Flights</h2>
				<div className="w-full grid gap-6 sm:grid-cols-2">
					{(itinerary.reservations as BoardingPass[]).map((reservation) => (
						<DisplayBoardingPass
							boardingPass={reservation}
							key={reservation.reservationId}
						/>
					))}
				</div>
			</section>
			<section className="space-y-4">
				<h2>Hotels</h2>
				<div className="w-full grid gap-6 sm:grid-cols-2">
					{(itinerary.bookings as HotelConfirmationType[]).map((hotel) => (
						<DisplayReceipt
							key={hotel.roomNumber}
							booking={{ details: hotel }}
						/>
					))}
				</div>
			</section>
		</main>
	);
}
