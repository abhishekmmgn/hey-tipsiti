import { Separator } from "@/components/ui/separator";
import type { LangType } from "@/lib/types";
import { getDictionary } from "@/lib/dictionaries";
import { generateUUID } from "@/lib/utils";
import { HomeMultimodalInput } from "@/components/multimodal-input";
import { Suspense } from "react";
import HomeSection from "@/components/home-section";

type Props = {
	params: Promise<{ id: string; lang: LangType }>;
	searchParams?: Promise<{ page?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
	const id = generateUUID();
	// const lang = (await params).lang;
	// const dict = await getDictionary(lang);

	const x = await searchParams;
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
						<div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							<p className="text-tertiary-foreground col-span-full">
								Finding good stuff for you...
							</p>
						</div>
					}
				>
					<HomeSection page={x?.page || "1"} />
				</Suspense>
			</section>
		</main>
	);
}
