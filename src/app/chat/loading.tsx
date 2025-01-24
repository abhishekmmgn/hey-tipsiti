import { ChatHeader } from "@/components/header";

export default function Loading() {
	return (
		<>
			<ChatHeader />
			<div className="h-screen w-screen place-items-center grid">
				<p>Loading...</p>
			</div>
		</>
	);
}
