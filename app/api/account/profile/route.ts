import { NextResponse } from "next/server";
import { customerUpdate } from "@/lib/shopify";
import { getAuthToken } from "@/lib/auth-cookies";

export async function PUT(request: Request) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    const { firstName, lastName, phone } = await request.json();
    const user = await customerUpdate(token, { firstName, lastName, phone });
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la mise à jour du profil." },
      { status: 500 }
    );
  }
}
