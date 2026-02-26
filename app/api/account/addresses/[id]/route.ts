import { NextResponse } from "next/server";
import { customerAddressUpdate, customerAddressDelete } from "@/lib/shopify";
import { getAuthToken } from "@/lib/auth-cookies";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const address = await customerAddressUpdate(token, id, body);
    return NextResponse.json({ address });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la mise à jour de l'adresse." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    const { id } = await params;
    await customerAddressDelete(token, id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la suppression de l'adresse." },
      { status: 500 }
    );
  }
}
