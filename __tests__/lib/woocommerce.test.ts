import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getProducts,
  getProductBySlug,
  getCategories,
} from "@/lib/woocommerce";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("WooCommerce API client", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.WOOCOMMERCE_URL = "https://test.com";
    process.env.WOOCOMMERCE_CONSUMER_KEY = "ck_test";
    process.env.WOOCOMMERCE_CONSUMER_SECRET = "cs_test";
  });

  describe("getProducts", () => {
    it("fetches products from WooCommerce API", async () => {
      const mockProducts = [{ id: 1, name: "Test" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      });

      const result = await getProducts();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/wp-json/wc/v3/products"),
        expect.objectContaining({ next: { revalidate: 60 } })
      );
      expect(result).toEqual(mockProducts);
    });

    it("passes category filter as query param", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      await getProducts({ category: 5 });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("category=5"),
        expect.any(Object)
      );
    });
  });

  describe("getProductBySlug", () => {
    it("fetches a single product by slug", async () => {
      const mockProduct = [{ id: 1, slug: "test-product" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      const result = await getProductBySlug("test-product");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("slug=test-product"),
        expect.any(Object)
      );
      expect(result).toEqual(mockProduct[0]);
    });

    it("returns null if no product found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      const result = await getProductBySlug("nonexistent");
      expect(result).toBeNull();
    });
  });

  describe("getCategories", () => {
    it("fetches categories from WooCommerce API", async () => {
      const mockCategories = [{ id: 1, name: "Robes" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      });

      const result = await getCategories();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/wp-json/wc/v3/products/categories"),
        expect.objectContaining({ next: { revalidate: 300 } })
      );
      expect(result).toEqual(mockCategories);
    });
  });
});
