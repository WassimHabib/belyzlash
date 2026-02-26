import { NextResponse } from "next/server";
import { getCustomerAddresses, customerAddressCreate } from "@/lib/shopify";
import { getAuthToken } from "@/lib/auth-cookies";

export async function GET() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    const { addresses, defaultAddressId } = await getCustomerAddresses(token);
    return NextResponse.json({ addresses, defaultAddressId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la récupération des adresses." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const address = await customerAddressCreate(token, body);
    return NextResponse.json({ address });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la création de l'adresse." },
      { status: 500 }
    );
  }
}
