import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/ui/Hero";
import ProductGrid from "../../components/ui/ProductGrid";
import Subscription from "../../components/ui/Subscription";
import Footer from "../../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <ProductGrid />
        <Subscription />
      </main>
    </>
  );
}