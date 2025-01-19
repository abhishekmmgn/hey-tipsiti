import { Header } from "@/components/header";
import MultimodalInput from "@/components/multimodal-input";
import { CoreMessage } from "ai";
import { notFound } from "next/navigation";

// import { auth } from "@/app/(auth)/auth";
import { Chat as PreviewChat } from "@/components/chat";
// import { getChatById } from "@/db/queries";
// import { Chat } from "@/db/schema";
import { convertToUIMessages } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
  const id = await (await params).id;

  // // const chatFromDb = await getChatById({ id });
  const chatFromDb = true;

  // if (chatFromDb) {
  //   notFound();
  // }

  // type casting and converting messages to UI messages
  // const chat: Chat = {
  // const chat = {
  //   ...chatFromDb,
  //   messages: convertToUIMessages(chatFromDb.messages as Array<CoreMessage>),
  // };

  // const session = await auth();

  // if (!session || !session.user) {
  //   return notFound();
  // }

  // if (session.user.id !== chat.userId) {
  //   return notFound();
  // }

  return (
    <PreviewChat
      id="2fb33cec-9ccd-4881-8173-8f7fcdb6dc20"
      initialMessages={[]}
    />
  );
  // return <PreviewChat id={chat.id} initialMessages={chat.messages} />;
}
