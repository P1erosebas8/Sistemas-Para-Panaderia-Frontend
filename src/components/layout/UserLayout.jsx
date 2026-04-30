// src/components/layout/UserLayout.jsx
import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function UserLayout() {
    const links = [
        { name: 'Mi Perfil', path: '/account', icon: '👤' },
        { name: 'Mis Compras', path: '/account/orders', icon: '🛍️' },
    ];
    const [userName, setUserName] = useState('Usuario');

    const loadUserData = () => {
        const activeUser = JSON.parse(localStorage.getItem('briselli_auth'));
        if (activeUser && activeUser.firstName) {
            setUserName(`${activeUser.firstName} ${activeUser.lastName}`);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 space-y-2">
                <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-sm mb-6">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Bienvenido,</p>
                    <p className="text-lg font-black text-artisan-primary">{userName}</p>
                </div>

                <nav className="space-y-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end
                            className={({ isActive }) => `
                flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all
                ${isActive
                                    ? 'bg-artisan-primary text-white shadow-lg shadow-orange-200'
                                    : 'bg-white text-gray-500 hover:bg-orange-50'}
              `}
                        >
                            <span>{link.icon}</span>
                            {link.name}
                        </NavLink>
                    ))}
                    <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 transition-all mt-4">
                        <span>🚪</span> Cerrar Sesión
                    </button>
                </nav>
            </aside>

            <main className="flex-1 bg-white rounded-3xl border border-orange-100 shadow-sm p-8">
                <Outlet context={{ onProfileUpdate: loadUserData }} />
            </main>
        </div>
    );
}