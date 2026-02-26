import { HeroSection } from "@/components/home/hero-section";
import { MarqueeBanner } from "@/components/home/marquee-banner";
import { BenefitsBar } from "@/components/home/benefits-bar";
import { FeaturedProducts } from "@/components/home/featured-products";
import { StatsSection } from "@/components/home/stats-section";
import { BrandBanner } from "@/components/home/brand-banner";
import { Testimonials } from "@/components/home/testimonials";
import { AmbassadriceSection } from "@/components/home/ambassadrice-section";
import { FormationsSection } from "@/components/home/formations-section";
import { getProducts } from "@/lib/shopify";
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
      <MarqueeBanner />
      <BenefitsBar />
      <FeaturedProducts products={products} />
      <StatsSection />
      <BrandBanner />
      <Testimonials />
      <AmbassadriceSection />
      <FormationsSection />
    </main>
  );
}
