import { NextResponse } from "next/server";
import { customerDefaultAddressUpdate } from "@/lib/shopify";
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

    const { addressId } = await request.json();
    await customerDefaultAddressUpdate(token, addressId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la mise à jour de l'adresse par défaut." },
      { status: 500 }
    );
  }
}
