import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getProductRecommendations } from "@/lib/shopify";
import { mockProducts } from "@/lib/mock-data";
import { ImageGallery } from "@/components/product/image-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { RecommendedProducts } from "@/components/product/recommended-products";

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

  const productGid = (product as any).gid;
  let recommended = productGid ? await getProductRecommendations(productGid) : [];
  recommended = recommended.filter((p) => p.slug !== product.slug);

  // Fallback: show other products if no recommendations
  if (recommended.length === 0) {
    try {
      const allProducts = await getProducts({ per_page: 10 });
      recommended = allProducts.filter((p) => p.slug !== product.slug).slice(0, 8);
    } catch {
      recommended = [];
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase mb-6 sm:mb-10">
          <Link href="/shop" className="text-brand-black/40 hover:text-brand-green transition-colors duration-300">
            Boutique
          </Link>
          <span className="text-brand-black/20">/</span>
          <span className="text-brand-black/60">{product.name}</span>
        </nav>

        {/* Product content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start pb-10">
          <ImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* Recommended products */}
        <RecommendedProducts products={recommended} />
      </div>
    </main>
  );
}
