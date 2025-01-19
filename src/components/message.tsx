"use client";

import { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { BotIcon, UserIcon } from "./custom/icons";
import { Markdown } from "./custom/markdown";
import { PlacesList, PlacesListSkeleton } from "./lists";

export const Message = ({
  chatId,
  role,
  content,
  toolInvocations,
  attachments,
}: {
  chatId: string;
  role: string;
  content: string | ReactNode;
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
}) => {
  console.log(toolInvocations && toolInvocations[0].toolName);
  return (
    <motion.div
      className={`flex flex-row gap-4 px-4 w-full md:px-0 first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-muted-foreground">
        {role === "assistant" ? <BotIcon /> : <UserIcon />}
      </div>

      <div className="flex flex-col gap-2 w-full">
        {content && typeof content === "string" && (
          <div
            className={`max-w-xl flex flex-col gap-4 ${
              role === "assistant"
                ? "text-tertiary-foreground "
                : "text-secondary-foreground "
            }`}
          >
            <Markdown>{content}</Markdown>
          </div>
        )}
        {toolInvocations && (
          <div className="flex flex-col gap-4">
            {toolInvocations.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === "result") {
                const { result } = toolInvocation;

                console.log(
                  toolInvocation.toolName,
                  toolInvocation.args,
                  toolInvocation.result,
                  toolInvocation.state
                );

                return (
                  <div key={toolCallId}>
                    {toolName === "getPlacesInACity" ? (
                      <PlacesList places={result.slice(0, 5)} />
                    ) : (
                      <div>{JSON.stringify(result, null, 2)}</div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={toolCallId} className="skeleton">
                    {toolName === "getPlacesInACity" ? (
                      <PlacesListSkeleton />
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};
