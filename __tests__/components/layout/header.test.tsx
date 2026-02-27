import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/components/cart/cart-provider";
import { AuthProvider } from "@/components/auth/auth-provider";

function renderHeader() {
  return render(
    <AuthProvider>
      <CartProvider>
        <Header />
      </CartProvider>
    </AuthProvider>
  );
}

describe("Header", () => {
  it("renders the logo image", () => {
    renderHeader();
    expect(screen.getByAltText("BelyzLash")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderHeader();
    const links = screen.getAllByRole("link", { name: /nos produits/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/shop");
  });

  it("renders cart link with item count", () => {
    renderHeader();
    expect(screen.getByLabelText(/panier/i)).toBeInTheDocument();
  });
});
