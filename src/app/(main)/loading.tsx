import { DefaultHeader } from "@/components/header";

export default function Loading() {
	return (
		<>
			<DefaultHeader />
			<div className="h-screen w-screen place-items-center grid">
				<p>Loading...</p>
			</div>
		</>
	);
}
