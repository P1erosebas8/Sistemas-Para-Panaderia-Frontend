// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inventoryValue: 0,
    lowStockCount: 0,
    activeStaff: 0,
    pendingOrders: 0,
    totalSalesDay: 0,
    byCategory: { Pasteles: 0, Panes: 0, Postres: 0 },
    storesInfo: { active: 0, inactive: 0, total: 0 }
  });

  useEffect(() => {
    // 1. Carga de Inventario
    const savedInventory = JSON.parse(localStorage.getItem('briselli_inventory') || '[]');
    
    // 2. Carga de Personal
    const savedUsers = JSON.parse(localStorage.getItem('briselli_users') || '[]');
    const activeUsers = savedUsers.filter(u => u.status === 'Activo').length;

    // 3. Carga de Sedes (Briselli Locations)
    const savedStores = JSON.parse(localStorage.getItem('briselli_stores') || '[]');
    const activeS = savedStores.filter(s => s.status === 'Activo').length;
    const inactiveS = savedStores.length - activeS;

    const savedSales = JSON.parse(localStorage.getItem('briselli_sales_today') || '0');
    const savedOrders = JSON.parse(localStorage.getItem('briselli_orders') || '[]');

    const value = savedInventory.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const lowStock = savedInventory.filter(p => p.stock < 5).length;
    const categories = savedInventory.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, { Pasteles: 0, Panes: 0, Postres: 0 });

    setStats({
      totalProducts: savedInventory.length,
      inventoryValue: value,
      lowStockCount: lowStock,
      activeStaff: activeUsers,
      pendingOrders: savedOrders.length, 
      totalSalesDay: parseFloat(savedSales),
      byCategory: categories,
      storesInfo: { active: activeS, inactive: inactiveS, total: savedStores.length }
    });
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Cabecera */}
      <div>
        <h2 className="text-3xl font-black text-artisan-primary tracking-tighter uppercase">Panel de Control</h2>
        <p className="text-artisan-tertiary text-sm font-medium italic">Briselli: Gestión en tiempo real</p>
      </div>

      {/* FILA 1: Ventas y Estado de Red */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-orange-100 shadow-sm flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Ingresos Totales (Hoy)</p>
            <h3 className="text-5xl font-black text-artisan-dark tracking-tighter">S/ {stats.totalSalesDay.toFixed(2)}</h3>
          </div>
          <div className="mt-4 md:mt-0 relative z-10 px-6 py-3 bg-green-50 rounded-2xl border border-green-100">
             <span className="text-green-600 font-black text-sm uppercase">Caja Abierta</span>
          </div>
          <div className="absolute right-0 top-0 opacity-5 text-[12rem] font-black select-none pointer-events-none -mr-10 -mt-10">$</div>
        </div>

        {/* NUEVA TARJETA: Estado de Sedes */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Estado de Red</p>
            <p className="text-2xl font-black text-artisan-dark">{stats.storesInfo.active} / {stats.storesInfo.total}</p>
            <p className="text-[10px] font-bold text-green-500 uppercase">Sedes Operativas</p>
          </div>
          {/* Mini Gráfico Circular (CSS Puro) */}
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center" 
               style={{ background: `conic-gradient(#8B572A ${(stats.storesInfo.active / stats.storesInfo.total) * 360}deg, #f3f4f6 0deg)` }}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-black text-artisan-primary">
                {Math.round((stats.storesInfo.active / stats.storesInfo.total) * 100) || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FILA 2: Columnas Operativas (Se mantiene igual) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">📦</div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Productos</p>
            <p className="text-xl font-black text-artisan-dark">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">👥</div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Personal</p>
            <p className="text-xl font-black text-artisan-dark">{stats.activeStaff} Activos</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl">⚠️</div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Stock Bajo</p>
            <p className="text-xl font-black text-artisan-dark">{stats.lowStockCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl">🕒</div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Pedidos</p>
            <p className="text-xl font-black text-artisan-dark">{stats.pendingOrders} Pendientes</p>
          </div>
        </div>
      </div>

      {/* FILA 3: Detalles (Inventario vs Sedes Detalle) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inventario por Categoría */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100">
           <h3 className="text-lg font-black text-artisan-primary mb-6 uppercase tracking-tight">📊 Inventario por Categoría</h3>
           <div className="space-y-5">
            {Object.entries(stats.byCategory).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1.5 font-black uppercase text-gray-400">
                  <span>{cat}</span>
                  <span>{count} artículos</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-artisan-secondary h-full transition-all duration-700" 
                    style={{ width: `${stats.totalProducts > 0 ? (count / stats.totalProducts) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100">
           <h3 className="text-lg font-black text-artisan-primary mb-6 uppercase tracking-tight">📍 Disponibilidad de Sedes</h3>
           <div className="flex items-center justify-around h-full pb-8">
              <div className="text-center">
                <p className="text-4xl font-black text-green-500">{stats.storesInfo.active}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Activas</p>
              </div>
              <div className="w-px h-12 bg-gray-100"></div>
              <div className="text-center">
                <p className="text-4xl font-black text-red-400">{stats.storesInfo.inactive}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inactivas</p>
              </div>
              <div className="w-px h-12 bg-gray-100"></div>
              <div className="text-center">
                <p className="text-4xl font-black text-artisan-primary">{stats.storesInfo.total}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}