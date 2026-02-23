import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandBanner } from "@/components/home/brand-banner";
import { getProducts } from "@/lib/woocommerce";
import { mockProducts } from "@/lib/mock-data";

export default async function Home() {
  let products;
  try {
    products = await getProducts({ per_page: 4 });
  } catch {
    products = mockProducts;
  }

  return (
    <main>
      <HeroSection />
      <FeaturedProducts products={products} />
      <BrandBanner />
    </main>
  );
}
