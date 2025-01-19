import { PlaceCard } from "@/components/cards/place-card";
import { places } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
  return (
    <div className="horizontal-padding vertical-padding pt-16 max-w-screen-lg mx-auto space-y-6">
      <h2>Locals</h2>
    </div>
  );
}
