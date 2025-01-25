export function VerifyPayment({
	result: { hasCompletedPayment },
}: {
	result: {
		hasCompletedPayment: boolean;
	};
}) {
	return (
		<p className="text-tertiary-foreground">
			{hasCompletedPayment
				? "Your payment transaction has been verified!"
				: "Unable to verify your payment, please try again!"}
		</p>
	);
}
