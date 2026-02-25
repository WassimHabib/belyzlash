import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getProducts,
  getProductBySlug,
  getCategories,
} from "@/lib/shopify";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Shopify API client", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.SHOPIFY_STORE_DOMAIN = "test-store.myshopify.com";
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = "test-token";
  });

  describe("getProducts", () => {
    it("fetches products from Shopify Storefront API", async () => {
      const mockResponse = {
        data: {
          products: {
            edges: [
              {
                node: {
                  id: "gid://shopify/Product/1",
                  title: "Test Product",
                  handle: "test-product",
                  description: "A test product",
                  descriptionHtml: "<p>A test product</p>",
                  availableForSale: true,
                  priceRange: {
                    minVariantPrice: { amount: "14.90", currencyCode: "EUR" },
                  },
                  compareAtPriceRange: {
                    minVariantPrice: { amount: "14.90", currencyCode: "EUR" },
                  },
                  images: { edges: [] },
                  options: [],
                  variants: { edges: [] },
                  collections: { edges: [] },
                },
              },
            ],
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getProducts();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("graphql.json"),
        expect.objectContaining({ method: "POST" })
      );
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Test Product");
      expect(result[0].slug).toBe("test-product");
    });
  });

  describe("getProductBySlug", () => {
    it("returns null if no product found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ data: { productByHandle: null } }),
      });

      const result = await getProductBySlug("nonexistent");
      expect(result).toBeNull();
    });
  });

  describe("getCategories", () => {
    it("fetches collections from Shopify", async () => {
      const mockResponse = {
        data: {
          collections: {
            edges: [
              {
                node: {
                  id: "gid://shopify/Collection/1",
                  title: "Kits",
                  handle: "kits",
                  productsCount: { count: 3 },
                },
              },
            ],
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getCategories();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Kits");
      expect(result[0].slug).toBe("kits");
      expect(result[0].count).toBe(3);
    });
  });
});
