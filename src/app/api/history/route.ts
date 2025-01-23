import { getChats } from "@/db/queries";

export async function GET() {
	const chats = await getChats();
	return Response.json(chats);
}
