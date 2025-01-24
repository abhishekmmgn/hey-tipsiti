import ItemCard from "@/components/trip/item-card";
import type { ItemCardType } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export default async function HomeSection() {
	const data: { data: ItemCardType[] } = await fetcher(
		`${process.env.NEXT_PUBLIC_SITE_URL}/api/places`,
	);
	// console.log(JSON.stringify(data.data[0]));
	if (!data) return null;
	return (
		<div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{data.data.map((item, index) => (
				<ItemCard {...item} key={item.id} />
			))}
		</div>
	);
}
