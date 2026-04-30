import { useState, useEffect } from 'react'; 
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const linkStyles = "hover:text-amber-700 transition-colors";
  const activeStyles = "text-amber-700 font-bold border-b-2 border-amber-700 pb-1";

  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem('briselli_auth');
        if (sessionData) {
          setUser(JSON.parse(sessionData));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error leyendo la sesión:", error);
        setUser(null);
      }
    };

    checkSession();
  }, [location]);
  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-[#FFFBF2] shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 mx-auto">

        <Link to="/" className="text-2xl font-bold">
          Panaderia Fina Briselli
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
            Visítanos
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to={user.role === 'admin' ? "/admin" : "/account"}
              className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-[#8d4b00] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-200 transition-all border border-orange-200"
            >
              <span>👤</span>
              {user.firstName || 'Mi Cuenta'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-[#8d4b00] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#6e3900] transition-all shadow-md shadow-orange-900/10"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}