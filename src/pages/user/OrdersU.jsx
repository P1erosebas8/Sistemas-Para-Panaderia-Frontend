import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { getAuthSession } from '../../utils/authSession';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("Todos");

  const createVoucher = (order) => {
    const subtotal = Number(order.totalAmount || 0);
    const igv = subtotal * 0.18;
    const total = subtotal;
    const serie = `B001-${String(order.id || '').padStart(8, '0')}`;
    const now = new Date(order.orderDate || Date.now());
    const printDate = now.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hour = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const rowsHtml = order.items
      .map((item, index) => {
        return `
          <tr>
            <td class="num">${String(index + 1).padStart(2, '0')}</td>
            <td class="num">${(item.quantity || 1).toFixed(3)}</td>
            <td class="desc">${item.productName || 'Producto'}</td>
            <td class="money">S/ ${Number(item.price || 0).toFixed(2)}</td>
            <td class="money">S/ ${(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
          </tr>
        `;
      }).join('');

    const voucherWindow = window.open('', '_blank', 'width=520,height=700');
    if (!voucherWindow) {
      alert('No se pudo abrir el voucher. Habilita ventanas emergentes.');
      return;
    }
    
    // Contenido del voucher
    voucherWindow.document.write(`
      <html>
        <head>
          <title>Boleta ${order.id}</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: "Segoe UI", Arial, sans-serif; margin: 0; padding: 20px; color: #1d1d1d; background: #f7f7f7; }
            .boleta { width: 760px; margin: 0 auto; background: #fff; border: 1px solid #d9d9d9; padding: 28px; }
            .center { text-align: center; }
            .title { font-size: 30px; letter-spacing: 2px; margin: 4px 0 2px; font-weight: 800; }
            .subtitle { margin: 2px 0; font-size: 13px; color: #444; }
            .boleta-tag { margin-top: 12px; padding: 10px 12px; border: 2px solid #111; font-weight: 800; font-size: 24px; letter-spacing: 1px; }
            .serie { margin-top: 6px; font-size: 28px; font-weight: 700; letter-spacing: 1px; }
            .grid { margin-top: 22px; display: grid; grid-template-columns: 180px 1fr; row-gap: 8px; font-size: 14px; }
            .label { color: #444; font-weight: 600; }
            .value { color: #111; font-weight: 700; }
            .table { width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 13px; }
            .table thead th { border-top: 1px solid #111; border-bottom: 1px solid #111; padding: 8px 6px; text-transform: uppercase; }
            .table tbody td { padding: 8px 6px; border-bottom: 1px dashed #d6d6d6; }
            .num { text-align: center; width: 56px; }
            .money { text-align: right; width: 120px; }
            .totals { margin-top: 18px; margin-left: auto; width: 320px; font-size: 14px; }
            .totals-row { display: flex; justify-content: space-between; padding: 4px 0; }
            .grand { border-top: 2px solid #111; margin-top: 6px; padding-top: 8px; font-size: 18px; font-weight: 800; }
          </style>
        </head>
        <body>
          <section class="boleta">
            <div class="center">
              <div class="title">PANADERIA FINA BRISELLI S.A.C.</div>
              <p class="subtitle">R.U.C. 2060XXXXXXX</p>
              <div class="boleta-tag">BOLETA ELECTRONICA</div>
              <div class="serie">${serie}</div>
            </div>
            <div class="grid">
              <div class="label">Fecha de emisión</div><div class="value">${printDate}</div>
              <div class="label">Hora</div><div class="value">${hour}</div>
              <div class="label">Estado</div><div class="value">${order.status}</div>
            </div>
            <table class="table">
              <thead><tr><th class="num">Item</th><th class="num">Cant.</th><th>Descripción</th><th class="money">P. Unit</th><th class="money">Total</th></tr></thead>
              <tbody>${rowsHtml}</tbody>
            </table>
            <div class="totals">
              <div class="totals-row grand"><span>TOTAL</span><span>S/ ${total.toFixed(2)}</span></div>
            </div>
          </section>
        </body>
      </html>
    `);
    voucherWindow.document.close();
    voucherWindow.focus();
    voucherWindow.print();
  };

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

  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  const filteredOrders = sortedOrders.filter(o => filterStatus === "Todos" || String(o.status).toUpperCase() === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-[#1b1c1a] tracking-tight">Historial de Pedidos</h1>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none font-bold text-gray-700 shadow-sm"
        >
          <option value="Todos">Todas las compras</option>
          <option value="PENDIENTE">Pendientes</option>
          <option value="PAGADO">Pagados</option>
          <option value="EN CAMINO">En Camino</option>
          <option value="ENTREGADO">Entregados</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No se encontraron pedidos</h3>
          <p className="text-gray-500 mb-6">No tienes pedidos que coincidan con este filtro.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
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
                <div className="text-right flex flex-col items-end gap-2">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Pagado</p>
                    <p className="text-xl font-black text-[#8d4b00]">S/ {Number(order.totalAmount).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => createVoucher(order)}
                    className="px-4 py-2 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-100 transition-colors shadow-sm"
                  >
                    📥 Descargar Voucher
                  </button>
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