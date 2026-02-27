import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreateCheckout = vi.fn();
vi.mock("@/lib/shopify", () => ({
  createCheckout: (...args: any[]) => mockCreateCheckout(...args),
}));

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("creates a Shopify checkout and returns checkout URL", async () => {
    mockCreateCheckout.mockResolvedValueOnce({
      id: "gid://shopify/Checkout/123",
      checkoutUrl: "https://shop.myshopify.com/checkout/123",
    });

    const { POST } = await import("@/app/api/checkout/route");
    const body = {
      items: [
        { variantId: "gid://shopify/ProductVariant/1", quantity: 2 },
      ],
    };

    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.checkoutUrl).toBe("https://shop.myshopify.com/checkout/123");
    expect(data.checkoutId).toBe("gid://shopify/Checkout/123");
    expect(mockCreateCheckout).toHaveBeenCalledOnce();
  });

  it("returns 400 if items are empty", async () => {
    const { POST } = await import("@/app/api/checkout/route");
    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
