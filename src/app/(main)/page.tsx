import { Separator } from "@/components/ui/separator";
import type { LangType } from "@/lib/types";
import { getDictionary } from "@/lib/dictionaries";
import { generateUUID } from "@/lib/utils";
import { HomeMultimodalInput } from "@/components/multimodal-input";
import { Suspense } from "react";
import HomeSection from "@/components/home-section";

export default async function Page({
	params,
}: {
	params: Promise<{ lang: LangType }>;
}) {
	const id = generateUUID();
	// const lang = (await params).lang;
	// const dict = await getDictionary(lang);

	return (
		<main className="mt-14 max-w-screen-lg mx-auto default-gap">
			<section className="10 mx-auto grid space-y-8 md:space-y-10 lg:space-y-12">
				<h1 className="home-h2 leading-tight text-center mx-auto">
					Hey, Tipsiti!
					<br />
					Let's plan the next adventure
				</h1>
				<HomeMultimodalInput className="w-full max-w-screen-md mx-auto" />
			</section>
			<Separator />
			<section className="grid gap-5 max-w-sm mx-auto sm:max-w-screen-md lg:max-w-screen-lg">
				<h3>Curated places by the community</h3>
				<Suspense
					fallback={
						<p className="text-tertiary-foreground">
							Finding good stuff for you...
						</p>
					}
				>
					<HomeSection />
				</Suspense>
			</section>
		</main>
	);
}
