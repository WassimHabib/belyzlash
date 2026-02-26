import { NextResponse } from "next/server";
import { customerAccessTokenCreate } from "@/lib/shopify";
import { setAuthToken } from "@/lib/auth-cookies";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    const { accessToken } = await customerAccessTokenCreate(email, password);

    await setAuthToken(accessToken);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Email ou mot de passe incorrect." },
      { status: 400 }
    );
  }
}
