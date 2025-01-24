import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Verify Email",
};

export default async function VerifyEmailPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	console.log(`Search Params are ${params.error}`);
	if (params.token_hash) redirect("/");
	return (
		<div className="w-full max-w-md mx-auto space-y-3">
			<div className="space-y-3 text-center lg:-mt-72">
				{params.error ? (
					<>
						<h1 className="text-center capitalize">
							{(params.error as string).split("_").join(" ")}
						</h1>
						<p className="text-center text-tertiary-foreground">
							{params.error_description}
						</p>
					</>
				) : (
					<>
						<h1>Verify your email</h1>
						<p className="text-secondary-foreground">
							We've sent you a confirmation mail to verify your account.
						</p>
					</>
				)}
			</div>
		</div>
	);
}
