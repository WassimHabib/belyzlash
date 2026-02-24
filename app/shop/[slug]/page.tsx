import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/woocommerce";
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ImageGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
    </main>
  );
}
