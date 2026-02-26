import { NextResponse } from "next/server";
import { getCustomerOrders } from "@/lib/shopify";
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

    const orders = await getCustomerOrders(token);
    return NextResponse.json({ orders });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur lors de la récupération des commandes." },
      { status: 500 }
    );
  }
}
