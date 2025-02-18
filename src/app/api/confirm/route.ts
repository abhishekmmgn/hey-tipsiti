import createClientForServer from "@/lib/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/";
	const redirectTo = request.nextUrl.clone();
	redirectTo.pathname = next;

	if (token_hash && type) {
		const supabase = await createClientForServer();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			return NextResponse.redirect("/");
		}
	}

	redirectTo.pathname = "/auth-code-error";
	return NextResponse.redirect(redirectTo);
}
