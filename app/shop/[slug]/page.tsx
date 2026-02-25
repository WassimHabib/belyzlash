import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/shopify";
import { mockProducts } from "@/lib/mock-data";
import { ImageGallery } from "@/components/product/image-gallery";
import { ProductInfo } from "@/components/product/product-info";

export async function generateStaticParams() {
  let products;
  try {
    products = await getProducts();
  } catch {
    products = mockProducts;
  }
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = mockProducts.find((p) => p.slug === slug) ?? null;
  }

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Top bar */}
      <div className="bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase">
            <Link href="/shop" className="text-brand-cream/40 hover:text-brand-cream transition-colors duration-300">
              Boutique
            </Link>
            <svg className="w-3 h-3 text-brand-cream/20" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-brand-gold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <ImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  );
}
