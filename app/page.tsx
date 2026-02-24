import { HeroSection } from "@/components/home/hero-section";
import { BenefitsBar } from "@/components/home/benefits-bar";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandBanner } from "@/components/home/brand-banner";
import { Testimonials } from "@/components/home/testimonials";
import { FormationsSection } from "@/components/home/formations-section";
import { getProducts } from "@/lib/woocommerce";
import { mockProducts } from "@/lib/mock-data";

export default async function Home() {
  let products;
  try {
    products = await getProducts({ per_page: 6 });
  } catch {
    products = mockProducts;
  }

  return (
    <main>
      <HeroSection />
      <BenefitsBar />
      <FeaturedProducts products={products} />
      <BrandBanner />
      <Testimonials />
      <FormationsSection />
    </main>
  );
}
