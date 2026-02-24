import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddToCartButton } from "@/components/product/add-to-cart-button";

describe("AddToCartButton", () => {
  it("renders the button", () => {
    render(<AddToCartButton onClick={vi.fn()} disabled={false} />);
    expect(screen.getByRole("button", { name: /ajouter au panier/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<AddToCartButton onClick={onClick} disabled={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<AddToCartButton onClick={vi.fn()} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
