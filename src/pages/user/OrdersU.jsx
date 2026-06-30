import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { getAuthSession } from '../../utils/authSession';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const session = getAuthSession();
      if (!session) return;
      
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'PENDIENTE': 'bg-amber-100 text-amber-800',
      'PREPARANDO': 'bg-blue-100 text-blue-800',
      'EN_CAMINO': 'bg-purple-100 text-purple-800',
      'ENTREGADO': 'bg-emerald-100 text-emerald-800',
      'CANCELADO': 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#8d4b00] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#1b1c1a] tracking-tight">Historial de Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Aún no tienes pedidos</h3>
          <p className="text-gray-500 mb-6">Tus compras recientes aparecerán aquí.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-orange-200 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-50">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900">Pedido #{String(order.id).padStart(5, '0')}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString('es-PE', {
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Pagado</p>
                  <p className="text-xl font-black text-[#8d4b00]">S/ {Number(order.totalAmount).toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-sm">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">?</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{item.productName}</p>
                      <p className="text-gray-500">Cant: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">S/ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}