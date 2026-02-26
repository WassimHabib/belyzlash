import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/shopify";
import { getAuthToken, deleteAuthToken } from "@/lib/auth-cookies";

export async function GET() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const user = await getCustomer(token);
    return NextResponse.json({ user });
  } catch {
    await deleteAuthToken();
    return NextResponse.json({ user: null });
  }
}
