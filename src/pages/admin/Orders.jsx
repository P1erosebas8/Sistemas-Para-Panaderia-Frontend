// src/pages/admin/Orders.jsx
import { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getAllOrdersAdmin();
        const mapped = data.map(o => ({
          id: `#${String(o.id).padStart(6, '0')}`,
          rawId: o.id,
          customer: `Cliente ID: ${o.userId || 'N/A'}`,
          date: o.orderDate,
          total: o.totalAmount,
          status: String(o.status || '').toUpperCase() === 'PENDING' ? 'Pendiente' : String(o.status || '').charAt(0).toUpperCase() + String(o.status || '').slice(1).toLowerCase(),
          items: (o.items || []).map(item => `${item.quantity}x ${item.productName}`).join(', '),
          originalItems: o.items || []
        }));
        
        setOrders(mapped);
      } catch (err) {
        console.error('Error al cargar órdenes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const updateStatus = async (rawId, newStatus) => {
    try {
      await orderService.updateOrderStatus(rawId, { status: newStatus.toUpperCase() });
      const updated = orders.map(order => 
        order.rawId === rawId ? { ...order, status: newStatus } : order
      );
      setOrders(updated);
    } catch (err) {
      console.error('Error actualizando estado:', err);
      alert('Hubo un error al actualizar el estado.');
    }
  };

  const filteredOrders = filter === 'Todos' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const formatOrderDateTime = (value) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value || '-';
    return parsed.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getOrderItems = (itemsText) => {
    if (!itemsText) return [];
    return String(itemsText)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const createVoucher = (order) => {
    const subtotal = Number(order.total || 0);
    const igv = subtotal * 0.18;
    const total = subtotal;
    const serie = `B001-${String(order.id || '').replace('#', '').padStart(8, '0')}`;
    const now = new Date();
    const printDate = formatOrderDateTime(order.date || now.toISOString());
    const hour = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const customerDoc = 'SIN DOC.';

    const rowsHtml = order.originalItems
      .map((item, index) => {
        return `
          <tr>
            <td class="num">${String(index + 1).padStart(2, '0')}</td>
            <td class="num">${(item.quantity || 1).toFixed(3)}</td>
            <td class="desc">${item.productName || 'Producto'}</td>
            <td class="money">S/ ${Number(item.price || 0).toFixed(2)}</td>
            <td class="money">S/ ${Number(item.subTotal || 0).toFixed(2)}</td>
          </tr>
        `;
      })
      .join('');

    const voucherWindow = window.open('', '_blank', 'width=520,height=700');
    if (!voucherWindow) {
      alert('No se pudo abrir el voucher. Habilita ventanas emergentes.');
      return;
    }

    voucherWindow.document.write(`
      <html>
        <head>
          <title>Boleta ${order.id}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              font-family: "Segoe UI", Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #1d1d1d;
              background: #f7f7f7;
            }
            .boleta {
              width: 760px;
              margin: 0 auto;
              background: #fff;
              border: 1px solid #d9d9d9;
              box-shadow: 0 8px 24px rgba(0,0,0,0.08);
              padding: 28px;
            }
            .center { text-align: center; }
            .title { font-size: 30px; letter-spacing: 2px; margin: 4px 0 2px; font-weight: 800; }
            .subtitle { margin: 2px 0; font-size: 13px; color: #444; }
            .boleta-tag {
              margin-top: 12px;
              padding: 10px 12px;
              border: 2px solid #111;
              font-weight: 800;
              font-size: 24px;
              letter-spacing: 1px;
            }
            .serie {
              margin-top: 6px;
              font-size: 28px;
              font-weight: 700;
              letter-spacing: 1px;
            }
            .grid {
              margin-top: 22px;
              display: grid;
              grid-template-columns: 180px 1fr;
              row-gap: 8px;
              column-gap: 10px;
              font-size: 14px;
            }
            .label { color: #444; font-weight: 600; }
            .value { color: #111; font-weight: 700; }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 18px;
              font-size: 13px;
            }
            .table thead th {
              border-top: 1px solid #111;
              border-bottom: 1px solid #111;
              padding: 8px 6px;
              text-transform: uppercase;
              letter-spacing: .5px;
            }
            .table tbody td {
              padding: 8px 6px;
              border-bottom: 1px dashed #d6d6d6;
              vertical-align: top;
            }
            .num { text-align: center; width: 56px; }
            .money { text-align: right; white-space: nowrap; width: 120px; }
            .desc { width: auto; }
            .totals {
              margin-top: 18px;
              margin-left: auto;
              width: 320px;
              font-size: 14px;
            }
            .totals-row {
              display: flex;
              justify-content: space-between;
              padding: 4px 0;
            }
            .grand {
              border-top: 2px solid #111;
              margin-top: 6px;
              padding-top: 8px;
              font-size: 18px;
              font-weight: 800;
            }
            .son {
              margin-top: 18px;
              font-weight: 700;
              letter-spacing: .4px;
            }
            .barcode {
              margin-top: 20px;
              height: 74px;
              background: repeating-linear-gradient(
                90deg,
                #111 0px,
                #111 3px,
                #fff 3px,
                #fff 6px,
                #111 6px,
                #111 8px,
                #fff 8px,
                #fff 12px
              );
              border: 1px solid #bbb;
            }
            .legal {
              margin-top: 16px;
              font-size: 12px;
              text-align: center;
              color: #555;
              line-height: 1.4;
            }
            @media print {
              body { background: #fff; padding: 0; }
              .boleta { box-shadow: none; border: none; width: auto; margin: 0; }
            }
          </style>
        </head>
        <body>
          <section class="boleta">
            <div class="center">
              <div class="title">PANADERIA FINA BRISELLI S.A.C.</div>
              <p class="subtitle">R.U.C. 2060XXXXXXX</p>
              <p class="subtitle">AV. BRISSELLI NRO. 010 - CHICLAYO - LAMBAYEQUE</p>
              <div class="boleta-tag">BOLETA ELECTRONICA</div>
              <div class="serie">${serie}</div>
            </div>

            <div class="grid">
              <div class="label">Fecha de emisión</div><div class="value">${printDate}</div>
              <div class="label">Hora</div><div class="value">${hour}</div>
              <div class="label">Tipo de moneda</div><div class="value">PEN</div>
              <div class="label">Cajero</div><div class="value">SISTEMA BRISELLI</div>
              <div class="label">Doc. Identidad</div><div class="value">${customerDoc}</div>
              <div class="label">Cliente</div><div class="value">${order.customer}</div>
              <div class="label">Estado</div><div class="value">${order.status}</div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th class="num">Item</th>
                  <th class="num">Cant.</th>
                  <th class="desc">Descripción</th>
                  <th class="money">P. Unit</th>
                  <th class="money">Total</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml || '<tr><td colspan="5">Sin detalle</td></tr>'}
              </tbody>
            </table>

            <div class="totals">
              <div class="totals-row"><span>Op. Gravada</span><span>S/ ${subtotal.toFixed(2)}</span></div>
              <div class="totals-row"><span>I.G.V. (18%)</span><span>S/ ${igv.toFixed(2)}</span></div>
              <div class="totals-row"><span>Descuento</span><span>S/ 0.00</span></div>
              <div class="totals-row grand"><span>IMPORTE TOTAL</span><span>S/ ${total.toFixed(2)}</span></div>
            </div>

            <div class="son">SON: ${total.toFixed(2)} SOLES</div>
            <div class="barcode"></div>

            <div class="legal">
              Representación impresa de la BOLETA DE VENTA ELECTRÓNICA.<br/>
              Consulte su comprobante en: www.briselli.com.pe/comprobantes
            </div>
          </section>
        </body>
      </html>
    `);
    voucherWindow.document.close();
    voucherWindow.focus();
    voucherWindow.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 animate-fadeIn">
        <p className="text-xl font-bold text-artisan-primary">Cargando pedidos...</p>
      </div>
    );
  }

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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-artisan-neutral/5 transition-colors">
                  <td className="p-5">
                    <p className="font-black text-artisan-primary text-sm">{order.id}</p>
                    <p className="text-artisan-dark font-medium">{order.customer}</p>
                  </td>
                  <td className="p-5 text-gray-400 text-sm font-medium">{formatOrderDateTime(order.date)}</td>
                  <td className="p-5">
                    <div className="space-y-1">
                      {getOrderItems(order.items).map((item, index) => (
                        <p
                          key={`${order.id}-${index}`}
                          className="text-xs font-semibold text-artisan-tertiary bg-artisan-neutral/40 px-2 py-1 rounded-lg w-fit"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="p-5 font-bold text-artisan-dark">S/ {Number(order.total).toFixed(2)}</td>
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
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.rawId, e.target.value)}
                        className="bg-white border border-gray-200 text-[10px] font-bold px-2 py-2 rounded-lg text-gray-700 outline-none hover:border-artisan-secondary transition-colors"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagado">Pagado</option>
                        <option value="En camino">En Camino</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                      <button
                        onClick={() => createVoucher(order)}
                        className="bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        VOUCHER
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-300 font-medium italic">
                  Aún no hay pedidos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
