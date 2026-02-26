import { NextResponse } from "next/server";
import { customerCreate } from "@/lib/shopify";
import { setAuthToken } from "@/lib/auth-cookies";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const { accessToken } = await customerCreate({
      firstName,
      lastName,
      email,
      password,
    });

    await setAuthToken(accessToken);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de l'inscription." },
      { status: 400 }
    );
  }
}
