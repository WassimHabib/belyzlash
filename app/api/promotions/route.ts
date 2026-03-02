import { NextResponse } from "next/server";
import { getActiveDiscounts } from "@/lib/shopify";

export async function GET() {
  const discounts = await getActiveDiscounts();
  return NextResponse.json(discounts);
}
