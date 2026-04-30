// src/pages/user/Orders.jsx
import { useState, useEffect } from 'react';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('briselli_active_user'));
    const allOrders = JSON.parse(localStorage.getItem('briselli_orders') || '[]');
    const userOrders = allOrders.filter(order => order.userEmail === activeUser?.email);
    
    setOrders(userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Entregado': return 'bg-green-100 text-green-600';
      case 'En camino': return 'bg-blue-100 text-blue-600';
      case 'Pendiente': return 'bg-orange-100 text-orange-600';
      case 'Cancelado': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-artisan-primary uppercase tracking-tighter">Mis Compras</h2>
        <p className="text-gray-500 text-sm">Historial detallado de tus pedidos en Briselli.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-orange-50 rounded-3xl">
          <span className="text-5xl block mb-4">🥐</span>
          <p className="text-gray-400 font-medium">Aún no has realizado ninguna compra.</p>
          <button className="mt-4 text-artisan-primary font-bold hover:underline">
            ¡Ir a ver los pasteles!
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-orange-50">
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Pedido</th>
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Fecha</th>
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Total</th>
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Estado</th>
                <th className="py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50/50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/30 transition-colors group">
                  <td className="py-5 font-bold text-artisan-dark text-sm">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-5 text-gray-500 text-sm">
                    {new Date(order.date).toLocaleDateString('es-PE')}
                  </td>
                  <td className="py-5 font-black text-artisan-primary text-sm">
                    S/ {order.total.toFixed(2)}
                  </td>
                  <td className="py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <button className="text-xs font-black text-artisan-secondary hover:text-artisan-primary transition-colors uppercase tracking-widest">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}