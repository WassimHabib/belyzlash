import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/shop/product-card";

const mockProduct = {
  id: 1,
  name: "Manteau Test",
  slug: "manteau-test",
  price: "389.00",
  images: [{ id: 1, src: "/test.jpg", alt: "Manteau" }],
};

describe("ProductCard", () => {
  it("renders product name and price", () => {
    render(<ProductCard product={mockProduct as any} />);
    expect(screen.getByText("Manteau Test")).toBeInTheDocument();
    expect(screen.getByText(/389.00/)).toBeInTheDocument();
  });

  it("links to product page", () => {
    render(<ProductCard product={mockProduct as any} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/shop/manteau-test");
  });
});
