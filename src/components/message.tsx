"use client";

import type { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BotIcon, UserIcon } from "./icons";
import { Markdown } from "./markdown";
import { PlacesList } from "./trip/lists";
import Weather from "@/components/other/weather";
import { AuthorizePayment } from "@/components/flights/authorize-payment";
import { DisplayBoardingPass } from "@/components/flights/boarding-pass";
import { CreateReservation } from "@/components/flights/create-reservation";
import { FlightStatus } from "@/components/flights/flight-status";
import { ListFlights } from "@/components/flights/list-flights";
import { SelectSeats } from "@/components/flights/select-seats";
import { VerifyPayment } from "@/components/flights/verify-payment";

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
	return (
		<motion.div
			className="flex flex-row gap-4 w-full md:px-0 first-of-type:pt-20"
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
					<div className="flex flex-col gap-4 max-w-screen-sm">
						{toolInvocations.map((toolInvocation) => {
							const { toolName, toolCallId, state } = toolInvocation;

							if (state === "result") {
								const { result } = toolInvocation;

								console.log(
									toolInvocation.toolName,
									toolInvocation.args,
									toolInvocation.result,
									toolInvocation.state,
								);

								return (
									<div key={toolCallId}>
										{toolName === "getWeather" ? (
											<Weather weatherAtLocation={result} />
										) : toolName === "getPlacesInACity" ? (
											<PlacesList places={result} />
										) : toolName === "getPlacesInACountry" ? (
											<PlacesList places={result} />
										) : toolName === "getCitiesInACountry" ? (
											<p>{result.toString()}</p>
										) : toolName === "displayFlightStatus" ? (
											<FlightStatus flightStatus={result} />
										) : toolName === "searchFlights" ? (
											<ListFlights chatId={chatId} results={result} />
										) : toolName === "selectSeats" ? (
											<SelectSeats chatId={chatId} availability={result} />
										) : toolName === "createReservation" ? (
											Object.keys(result).includes("error") ? null : (
												<CreateReservation reservation={result} />
											)
										) : toolName === "authorizePayment" ? (
											<AuthorizePayment intent={result} />
										) : toolName === "displayBoardingPass" ? (
											<DisplayBoardingPass boardingPass={result} />
										) : toolName === "verifyPayment" ? (
											<VerifyPayment result={result} />
										) : (
											<div>{JSON.stringify(result, null, 2)}</div>
										)}
									</div>
								);
							}
							return (
								<div
									className="text-sm text-tertiary-foreground"
									key={toolCallId}
								>
									{toolName === "getWeather" ? (
										<p>Fetching weather...</p>
									) : toolName === "getPlacesInACity" ? (
										<p>
											Finding best places in {toolInvocation.args?.cityName}...
										</p>
									) : toolName === "getPlacesInACountry" ? (
										<p>
											Finding best places in {toolInvocation.args?.countryName}
											...
										</p>
									) : toolName === "getCitiesInACountry" ? (
										<p>
											Finding best cities to visit in{" "}
											{toolInvocation.args?.countryName}...
										</p>
									) : toolName === "displayFlightStatus" ? (
										<p>Getting flight status...</p>
									) : toolName === "searchFlights" ? (
										<p>Finding best flights...</p>
									) : toolName === "selectSeats" ? (
										<p>Getting latest information about seats...</p>
									) : toolName === "createReservation" ? (
										<p>Creating reservation...</p>
									) : toolName === "authorizePayment" ? (
										<p>Verifying payment...</p>
									) : toolName === "displayBoardingPass" ? (
										<p>Getting your boarding pass...</p>
									) : toolName === "verifyPayment" ? (
										<p>Verifying payment...</p>
									) : (
										<p>Working on it...</p>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</motion.div>
	);
};
