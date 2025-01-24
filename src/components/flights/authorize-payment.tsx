"use client";

import { differenceInMinutes, getDay } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { fetcher } from "@/lib/utils";

import { CheckCircle, InfoIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function AuthorizePayment({
	intent = { reservationId: "sample-uuid" },
}: {
	intent?: { reservationId: string };
}) {
	const [input, setInput] = useState("");
	const queryClient = useQueryClient();

	const { data: reservation } = useQuery({
		queryKey: ["reservation", intent.reservationId],
		queryFn: async () => {
			const data = await fetcher(`/api/reservation?id=${intent.reservationId}`);
			return data;
		},
	});
	const mutation = useMutation({
		mutationFn: async (magicWord: string) => {
			const response = await fetch(
				`/api/reservation?id=${intent.reservationId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ magicWord }),
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText || response.statusText);
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["reservation", intent.reservationId],
			});
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		},
	});

	return reservation?.hasCompletedPayment ? (
		<div className="bg-emerald-500 p-4 rounded-lg gap-4 flex flex-row justify-between items-center">
			<div className="dark:text-emerald-950 text-emerald-50 font-medium">
				Payment Verified
			</div>
			<div className="dark:text-emerald-950 text-emerald-50">
				<CheckCircle size={20} />
			</div>
		</div>
	) : differenceInMinutes(new Date(), new Date(reservation?.createdAt)) >
		150 ? (
		<div className="bg-red-500 p-4 rounded-lg gap-4 flex flex-row justify-between items-center">
			<div className="text-background">Payment Gateway Timed Out</div>
			<div className="text-background">
				<InfoIcon size={20} />
			</div>
		</div>
	) : (
		<div className="bg-tertiary p-4 rounded-lg flex flex-col gap-2">
			<div className="text font-medium">
				Use your saved information for this transaction
			</div>
			<div className="text-tertiary-foreground text-sm sm:text-base">
				Enter "Done" to authorize payment.
			</div>

			<Input
				type="text"
				placeholder="..."
				className="text-base mt-2"
				onChange={(event) => setInput(event.currentTarget.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						mutation.mutate(input);
						setInput("");
					}
				}}
			/>
		</div>
	);
}
