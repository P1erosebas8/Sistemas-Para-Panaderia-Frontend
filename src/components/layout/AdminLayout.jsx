// src/layouts/AdminLayout.jsx
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminLayout() {
const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('briselli_auth'));

    if (!authUser || authUser.role !== 'admin') {
      console.error("Acceso no autorizado al panel administrativo");
      navigate('/login', { replace: true });
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  if (!isAuthorized) return null;
return (
  <div className="flex min-h-screen bg-gray-50 overflow-hidden font-sans">
    <AdminSidebar />
    <main className="flex-1 h-screen overflow-y-auto bg-artisan-neutral/30">
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black bg-artisan-secondary text-white px-2 py-1 rounded">
            {authUser.role}
          </span>
          <span className="text-artisan-dark font-semibold italic">
            Panel Briselli — {authUser.name}
          </span>
        </div>
        {/* Botón rápido para cerrar sesión */}
        <button
          onClick={() => { localStorage.removeItem('briselli_auth'); window.location.reload(); }}
          className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors"
        >
          SALIR
        </button>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </main>
  </div>
);
}