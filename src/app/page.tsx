import TripCard from "@/components/trip-card";
import { Separator } from "@/components/ui/separator";
import { LangType } from "@/lib/types";
import { getDictionary } from "@/lib/dictionaries";
import { generateUUID } from "@/lib/utils";
import { HomeMultimodalInput } from "@/components/multimodal-input";

export default async function Page({
	params,
}: {
	params: Promise<{ lang: LangType }>;
}) {
	const id = generateUUID();
	// const lang = (await params).lang;
	// const dict = await getDictionary(lang);
	return (
		<main className="mt-14 max-w-screen-lg mx-auto default-gap horizontal-padding vertical-padding">
			<section className="10 mx-auto grid space-y-8 md:space-y-10 lg:space-y-12">
				<h1 className="home-h2 text-center text-balance max-w-screen-sm mx-auto">
					Let's plan your next adventure.
				</h1>
				<HomeMultimodalInput className="w-full max-w-screen-md mx-auto" />
			</section>
			<Separator />
			<section className="grid space-y-4 max-w-sm mx-auto sm:max-w-screen-md lg:max-w-screen-lg">
				<h3>Discover community created trips</h3>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 12 }).map((_, index) => (
						<TripCard
							key={index.toString()}
							uid={index.toString()}
							image="https://www.datocms-assets.com/55798/1672411974-alcantara-view-edited.png?w=600&h=750&q=33&fit=crop&auto=format&crop=focalpoint&fp-x=0.3&fp-y=0.59"
							title="All Day in Miami"
							description="Independent coffee shop with an impressive selection of drinks and food, plus a pleasant atmosphere to pair. Artisanal brews made using select beans and various methods - perhaps even opt for their own macadamia milk that is made in-house."
							creator={{ uid: "233", name: "Johnny Ive" }}
						/>
					))}
				</div>
			</section>
		</main>
	);
}
