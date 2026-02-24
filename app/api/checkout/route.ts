import { NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.billing || !body.billing.email) {
    return NextResponse.json(
      { error: "Billing info required" },
      { status: 400 }
    );
  }

  const order = await createOrder({
    payment_method: "stripe",
    payment_method_title: "Carte bancaire",
    set_paid: false,
    billing: body.billing,
    shipping: body.billing,
    line_items: body.items,
  });

  return NextResponse.json({ orderId: order.id });
}
