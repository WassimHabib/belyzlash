import { NextResponse } from "next/server";
import { customerAccessTokenDelete } from "@/lib/shopify";
import { getAuthToken, deleteAuthToken } from "@/lib/auth-cookies";

export async function POST() {
  try {
    const token = await getAuthToken();

    if (token) {
      await customerAccessTokenDelete(token).catch(() => {});
    }

    await deleteAuthToken();

    return NextResponse.json({ ok: true });
  } catch {
    await deleteAuthToken();
    return NextResponse.json({ ok: true });
  }
}
