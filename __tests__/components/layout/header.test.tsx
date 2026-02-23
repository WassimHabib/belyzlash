import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/components/cart/cart-provider";

function renderHeader() {
  return render(
    <CartProvider>
      <Header />
    </CartProvider>
  );
}

describe("Header", () => {
  it("renders the brand name", () => {
    renderHeader();
    expect(screen.getByText("belyzlash")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute("href", "/shop");
  });

  it("renders cart link with item count", () => {
    renderHeader();
    expect(screen.getByLabelText(/panier/i)).toBeInTheDocument();
  });
});
