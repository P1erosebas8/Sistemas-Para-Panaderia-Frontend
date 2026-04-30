// src/layouts/AdminLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { clearAuthSession, getAuthSession } from '../../utils/authSession';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const session = getAuthSession();

    if (!session || session.role !== 'admin') {
      console.error("Acceso no autorizado");
      navigate('/login', { replace: true });
    } else {
      setAuthUser(session);
      setIsAuthorized(true);
    }
  }, [navigate]);

  if (!isAuthorized || !authUser) return null;
  return (

    <div className="flex min-h-screen bg-gray-50 overflow-hidden font-sans">

      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-artisan-neutral/30">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-artisan-secondary text-white px-2 py-1 rounded">
              {authUser.role}
            </span>
            <span className="text-gray-800 font-semibold italic text-sm">
              Panel Briselli — {
                authUser.firstName || authUser.name || authUser.email
              }
            </span>
          </div>
          <button
            onClick={() => { clearAuthSession(); window.location.reload(); }}
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