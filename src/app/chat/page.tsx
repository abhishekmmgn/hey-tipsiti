import { Chat } from "@/components//chat";
import { generateUUID } from "@/lib/utils";
import createClientForServer from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
	const { message } = await searchParams;
	const id = generateUUID();
	const supabase = await createClientForServer();
	const userRes = await supabase.auth.getUser();

	if (userRes.error) {
		redirect("/login");
	}
	return (
		<Chat
			key={id}
			id={id}
			initialMessages={[]}
			paramsMessage={message as string}
			hideMultimodal={false}
		/>
	);
}
