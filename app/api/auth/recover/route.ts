import { NextResponse } from "next/server";
import { customerRecover } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "L'adresse e-mail est requise." },
        { status: 400 }
      );
    }

    await customerRecover(email);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la récupération du compte." },
      { status: 500 }
    );
  }
}
