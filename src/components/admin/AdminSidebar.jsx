// src/components/admin/AdminSidebar.jsx
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Inventario', path: '/admin/inventory', icon: '📦' },
    { name: 'Pedidos', path: '/admin/orders', icon: '📝' },
    { name: 'Sedes', path: '/admin/stores', icon: '📍' },
    { name: 'Usuarios', path: '/admin/users', icon: '👥' },
];

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <aside className="w-64 bg-artisan-primary text-artisan-neutral h-screen flex flex-col shadow-xl">
            <div className="p-8">
                <h2 className="text-2xl font-black tracking-tighter border-b border-artisan-tertiary/30 pb-4">
                    BRIS<span>ELLI</span> <span className="text-xs block font-light tracking-widest opacity-70">PANEL ADMINISTRADOR</span>
                </h2>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors font-medium ${location.pathname === item.path
                                ? "bg-artisan-secondary text-white shadow-inner"
                                : "hover:bg-white/10"
                            }`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-artisan-tertiary">
                <button className="flex font-black items-center space-x-3 text-l opacity-70 hover:opacity-100 transition-opacity w-full" onClick={() => { localStorage.removeItem('briselli_auth'); window.location.reload(); }}>
                <span>🚪</span>
                <span>Cerrar Sesión</span>
            </button>
        </div>
    </aside >
  );
}