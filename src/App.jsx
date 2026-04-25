// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Hero from "./components/ui/Hero";
import ProductGrid from "./components/ui/ProductGrid";
import Subscription from "./components/ui/Subscription";
import AboutSection from "./pages/public/About";

const Home = () => (
  <>
    <Hero />
    <ProductGrid />
    <Subscription />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout envolverá a todas las rutas internas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutSection />} />
          
          {/* Ejemplo de rutas futuras que podrías añadir:
          <Route path="pastries" element={<PastriesPage />} />
          <Route path="contact" element={<ContactPage />} /> 
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;