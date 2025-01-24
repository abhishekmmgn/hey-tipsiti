import { ItineraryCard } from "@/components/trip/itinerary-card";
import { places } from "@/lib/data";
import Link from "next/link";

export default async function Page() {
	return (
		<main className="max-w-screen-lg mx-auto space-y-6">
			<h2>Itineraries</h2>
			<div className="w-fit justify-center mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{places.map((place) => (
					<Link href={`/itineraries/${place.id}`} key={place.id}>
						<ItineraryCard {...place} isChatUI={false} className="max-w-sm" />
					</Link>
				))}
			</div>
		</main>
	);
}
