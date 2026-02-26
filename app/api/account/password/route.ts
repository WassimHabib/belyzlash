import { NextResponse } from "next/server";
import { customerPasswordUpdate } from "@/lib/shopify";
import { getAuthToken, setAuthToken } from "@/lib/auth-cookies";

export async function PUT(request: Request) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    const { password } = await request.json();
    const newToken = await customerPasswordUpdate(token, password);
    await setAuthToken(newToken.accessToken);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la mise à jour du mot de passe." },
      { status: 500 }
    );
  }
}
