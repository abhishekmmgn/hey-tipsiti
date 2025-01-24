import { getChatsByUserId } from "@/db/queries";
import createClientForServer from "@/lib/supabase/server";

export async function GET() {
	const supabase = await createClientForServer();
	const userRes = await supabase.auth.getUser();

	if (userRes.error) {
		return Response.json({ error: "Not authenticated" });
	}
	const chats = await getChatsByUserId(userRes.data.user.id);
	return Response.json(chats);
}
