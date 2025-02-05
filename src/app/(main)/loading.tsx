import { DefaultHeader } from "@/components/header";

export default function Loading() {
	return (
		<>
			<DefaultHeader />
			<div className="h-[80dvh] w-[80dvw] place-items-center grid">
				<p>Loading...</p>
			</div>
		</>
	);
}
