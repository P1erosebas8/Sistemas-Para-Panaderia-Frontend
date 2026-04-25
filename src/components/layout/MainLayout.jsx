// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* El pt-20 es para que el contenido no quede oculto bajo el Navbar fixed */}
      <main className="flex-grow">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}