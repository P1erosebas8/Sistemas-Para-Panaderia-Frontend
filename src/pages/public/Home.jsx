import Hero from "../../components/ui/Hero";
import ProductGrid from "../../components/ui/ProductGrid";
//import Subscription from "../../components/ui/Subscription";
//import Footer from "../../components/layout/Footer";
import Testimonials from "./Testimonials";
import PromoBanner from "../../components/ui/Promo";

export default function Home() {
  return (
    <>
      <main className="pt-20">
        <Hero />
        <ProductGrid />
        <PromoBanner />
        <Testimonials />
      </main>
    </>
  );
}