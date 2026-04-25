import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const linkStyles = "hover:text-amber-700 transition-colors";
  
  const activeStyles = "text-amber-700 font-bold border-b-2 border-amber-700 pb-1";

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-[#FFFBF2] shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 mx-auto">

        <Link to="/" className="text-2xl font-bold">
          Panaderia Ñefas
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavLink 
            to="/postres" 
            className={({ isActive }) => isActive ? activeStyles : linkStyles}
          >
            Postres
          </NavLink>
          
          <NavLink 
            to="/panes" 
            className={({ isActive }) => isActive ? activeStyles : linkStyles}
          >
            Panes
          </NavLink>

          <NavLink 
            to="/pasteles" 
            className={({ isActive }) => isActive ? activeStyles : linkStyles}
          >
            Pasteles
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? activeStyles : linkStyles}
          >
            Nosotros
          </NavLink>

          <NavLink 
            to="/ubicanos" 
            className={({ isActive }) => isActive ? activeStyles : linkStyles}
          >
            Ubicanos
          </NavLink>
        </div>

        <div className="flex space-x-4">
          <Link to="/cart" className="cursor-pointer">🛒</Link>
          <Link to="/profile" className="cursor-pointer">👤</Link>
        </div>
      </div>
    </nav>
  );
}