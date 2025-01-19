import { PlaceCard } from "@/components/cards/place-card";
import { places } from "@/lib/data";

export default async function Page() {
  return (
    <div className="horizontal-padding vertical-padding pt-16 max-w-screen-lg mx-auto space-y-6">
      <h2>Places</h2>
      <div className="w-fit justify-center mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <PlaceCard {...place} key={place.id} className="max-w-sm" />
        ))}
      </div>
    </div>
  );
}
