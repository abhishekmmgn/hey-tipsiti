import { Chat } from "@/components//chat";
import { generateUUID } from "@/lib/utils";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
	const { message } = await searchParams;
	const id = generateUUID();
	return (
		<Chat
			key={id}
			id={id}
			initialMessages={[]}
			paramsMessage={message as string}
		/>
	);
}
