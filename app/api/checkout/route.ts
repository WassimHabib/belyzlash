import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Items required" },
        { status: 400 }
      );
    }

    const checkout = await createCheckout(
      body.items.map((item: { variantId: string; quantity: number }) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
      body.shippingAddress,
      body.email
    );

    return NextResponse.json({
      checkoutUrl: checkout.checkoutUrl,
      checkoutId: checkout.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
