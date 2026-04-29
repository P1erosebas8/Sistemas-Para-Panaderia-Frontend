import { NavLink } from "react-router-dom";

export default function Footer() {
  const linkStyles = "block text-gray-300 hover:text-yellow-400 text-sm mb-2";
  const activeStyles = "block text-yellow-400 text-sm mb-2 font-semibold";

  return (
    <footer className="bg-[#1a1a1a] text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white-400">Fina Briselli</h2>
          <p className="mt-3 text-gray-300 text-sm">
            Pan fresco, pasteles artesanales y sabor único que hacen todos tus días especiales.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Enlaces</h3>

          <NavLink to="/postres" className={({ isActive }) => isActive ? activeStyles : linkStyles}>
            Postres
          </NavLink>

          <NavLink to="/panes" className={({ isActive }) => isActive ? activeStyles : linkStyles}>
            Panes
          </NavLink>

          <NavLink to="/pasteles" className={({ isActive }) => isActive ? activeStyles : linkStyles}>
            Pasteles
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => isActive ? activeStyles : linkStyles}>
            Nosotros
          </NavLink>

          <NavLink to="/ubicanos" className={({ isActive }) => isActive ? activeStyles : linkStyles}>
            Visítanos
          </NavLink>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contacto</h3>
          <p className="text-gray-300 text-sm">📍 Lima, Perú</p>
          <p className="text-gray-300 text-sm">📞 +51 999 999 999</p>
          <p className="text-gray-300 text-sm">✉ contacto@panaderia.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Síguenos</h3>
          <div className="flex flex-col space-y-2 text-gray-300 text-sm">
            <a href="https://www.facebook.com/PasteleriaFinaBriselli/" className="hover:text-yellow-400">📘 Facebook</a>
            <a href="https://www.instagram.com/brisellipasteleriafina?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-yellow-400">📸 Instagram</a>
            <a href="https://www.tiktok.com/@pasteleriafinabriselli?is_from_webapp=1&sender_device=pc" className="hover:text-yellow-400">🎵 TikTok</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Fina Briselli. Todos los derechos reservados.
      </div>
    </footer>
  );
}