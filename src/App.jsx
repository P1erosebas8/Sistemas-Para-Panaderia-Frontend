import Navbar from "./components/layout/Navbar";
import Hero from "./components/ui/Hero";
import ProductGrid from "./components/ui/ProductGrid";
import Subscription from "./components/ui/Subscription";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductGrid />
      <Subscription />
      <Footer />
    </>
  );
}

export default App;