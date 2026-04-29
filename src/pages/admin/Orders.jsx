// src/pages/admin/Orders.jsx
import { useState, useEffect } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    const savedOrders = localStorage.getItem('briselli_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Pedidos de prueba si está vacío
      const demoOrders = [
        { id: '#1001', customer: 'Piero Bellido', date: '2026-04-28', total: 85.00, status: 'Pendiente', items: '2x Selva Negra' },
        { id: '#1002', customer: 'Maria Garcia', date: '2026-04-28', total: 12.50, status: 'Entregado', items: '3x Pan de Yema' },
      ];
      setOrders(demoOrders);
      localStorage.setItem('briselli_orders', JSON.stringify(demoOrders));
    }
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem('briselli_orders', JSON.stringify(updated));
  };

  const filteredOrders = filter === 'Todos' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-artisan-primary tracking-tighter">Gestión de Pedidos</h2>
          <p className="text-artisan-tertiary text-sm font-medium">Control de ventas y entregas diarias</p>
        </div>
        
        {/* Filtros de Estado */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          {['Todos', 'Pendiente', 'Entregado'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === status 
                ? 'bg-artisan-secondary text-white shadow-md' 
                : 'text-gray-400 hover:text-artisan-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Pedidos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-artisan-neutral/30 text-artisan-primary text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-5 border-b">ID / Cliente</th>
              <th className="p-5 border-b">Fecha</th>
              <th className="p-5 border-b">Productos</th>
              <th className="p-5 border-b">Total</th>
              <th className="p-5 border-b">Estado</th>
              <th className="p-5 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-artisan-neutral/5 transition-colors">
                <td className="p-5">
                  <p className="font-black text-artisan-primary text-sm">{order.id}</p>
                  <p className="text-artisan-dark font-medium">{order.customer}</p>
                </td>
                <td className="p-5 text-gray-400 text-sm font-medium">{order.date}</td>
                <td className="p-5 text-sm text-artisan-tertiary italic">{order.items}</td>
                <td className="p-5 font-bold text-artisan-dark">S/ {order.total.toFixed(2)}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'Pendiente' 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'bg-green-100 text-green-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex justify-center gap-2">
                    {order.status === 'Pendiente' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'Entregado')}
                        className="bg-artisan-primary text-white text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-artisan-secondary transition-colors"
                      >
                        MARCAR ENTREGADO
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg">👁️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}