import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { getAuthSession } from '../../utils/authSession';
import logo from '../../assets/Briselli.png';

export default function Navbar() {

  const linkStyles = "hover:text-amber-700 transition-colors";

  const activeStyles =
    "text-amber-700 font-bold border-b-2 border-amber-700 pb-1";

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const checkSession = () => {
      try {
        const session = getAuthSession();
        setUser(session);
      } catch (error) {
        console.error("Error leyendo la sesión:", error);
        setUser(null);
      }
    };

    const readCartCount = () => {
      try {
        const cart = JSON.parse(
          localStorage.getItem('briselli_cart') || '[]'
        );
        const units = cart.reduce(
          (sum, item) => sum + (Number(item.quantity) || 0),
          0
        );
        setCartCount(units);
      } catch (error) {
        console.error("Error leyendo carrito:", error);
        setCartCount(0);
      }
    };

    const onCartUpdated = (event) => {
      if (typeof event?.detail?.count === 'number') {
        setCartCount(event.detail.count);
      } else {
        readCartCount();
      }
    };

    checkSession();
    readCartCount();

    window.addEventListener('storage', readCartCount);
    window.addEventListener('briselli_cart_updated', onCartUpdated);

    return () => {
      window.removeEventListener('storage', readCartCount);
      window.removeEventListener('briselli_cart_updated', onCartUpdated);
    };
  }, [location]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/40 bg-[#FFFBF2]/50 backdrop-blur-lg shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 mx-auto">

        {/* LOGO */}
        <Link 
          to="/" 
          onClick={(e) => e.currentTarget.blur()}
          className="flex items-center outline-none focus:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent]"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <img
            src={logo}
            alt="Briselli Logo"
            className="h-14 w-auto object-contain select-none bg-transparent"
            draggable="false"
          />
        </Link>

        {/* MENÚ */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/postres"
            className={({ isActive }) =>
              isActive ? activeStyles : linkStyles
            }
          >
            Postres
          </NavLink>

          <NavLink
            to="/pasteles"
            className={({ isActive }) =>
              isActive ? activeStyles : linkStyles
            }
          >
            Pasteles
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeStyles : linkStyles
            }
          >
            Nosotros
          </NavLink>

          <NavLink
            to="/ubicanos"
            className={({ isActive }) =>
              isActive ? activeStyles : linkStyles
            }
          >
            Visítanos
          </NavLink>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-4">
          {user?.role?.toLowerCase() === 'user' && (
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                `relative ml-2 p-2.5 rounded-full border transition-all ${
                  isActive
                    ? "text-amber-700 border-amber-700 bg-amber-50"
                    : "text-[#8d4b00] border-orange-200 hover:bg-orange-50"
                }`
              }
              title="Carrito"
              aria-label="Carrito"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1 5h12m-9 0a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
                />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 rounded-full bg-[#8d4b00] text-white text-[10px] font-black flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

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