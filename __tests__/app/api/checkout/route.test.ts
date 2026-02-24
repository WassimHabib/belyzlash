import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreateOrder = vi.fn();
vi.mock("@/lib/woocommerce", () => ({
  createOrder: (...args: any[]) => mockCreateOrder(...args),
}));

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("creates a WooCommerce order and returns order id", async () => {
    mockCreateOrder.mockResolvedValueOnce({ id: 123 });

    const { POST } = await import("@/app/api/checkout/route");
    const body = {
      billing: {
        first_name: "Jean",
        last_name: "Dupont",
        email: "jean@test.com",
        phone: "0600000000",
        address_1: "1 rue de Paris",
        city: "Paris",
        postcode: "75001",
        country: "FR",
      },
      items: [{ product_id: 1, quantity: 2 }],
    };

    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.orderId).toBe(123);
    expect(mockCreateOrder).toHaveBeenCalledOnce();
  });

  it("returns 400 if billing info is missing", async () => {
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
