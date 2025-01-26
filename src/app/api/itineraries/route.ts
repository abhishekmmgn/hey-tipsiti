import { getItineraries } from "@/db/queries";
import createClientForServer from "@/lib/supabase/server";

export async function GET() {
	const supabase = await createClientForServer();
	const userRes = await supabase.auth.getUser();

	if (userRes.error) {
		return Response.json({ error: "Not authenticated" });
	}
	const data = await getItineraries(userRes.data.user.id);
	const formattedData = [];
	data.map((itinerary) => {
		formattedData.push(itinerary);
	});
	return Response.json(data);
}
