import { useState, useEffect } from 'react';
import { checkoutCartFlow } from '../../utils/cartFlow';

export default function UserOrders() {
  const [cartItems, setCartItems] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    confirmText: '',
    confirmClass: '',
    onConfirm: null,
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('briselli_cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const emitCartUpdate = (items) => {
    const count = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    window.dispatchEvent(
      new CustomEvent('briselli_cart_updated', { detail: { count } })
    );
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('briselli_cart', JSON.stringify(updatedCart));
    emitCartUpdate(updatedCart);
  };

  const handleChangeQuantity = (itemId, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id !== itemId) return item;
      const currentQty = Number(item.quantity) || 1;
      const nextQty = Math.max(1, currentQty + delta);
      return {
        ...item,
        quantity: nextQty,
        total: (Number(item.price) || 0) * nextQty,
      };
    });

    setCartItems(updatedCart);
    localStorage.setItem('briselli_cart', JSON.stringify(updatedCart));
    emitCartUpdate(updatedCart);
  };

  const totalGeneral = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const handleCheckout = () => {
    setConfirmModal({
      open: true,
      title: 'Confirmar compra',
      message: '¿Deseas finalizar la compra de tu carrito?',
      confirmText: 'Sí, finalizar',
      confirmClass: 'bg-[#8d4b00] hover:bg-[#6e3900] text-white',
      onConfirm: () => {
        const result = checkoutCartFlow();
        if (!result.ok) {
          alert(result.message);
          return;
        }

        setCartItems([]);
        alert(`Pedido ${result.orderId} creado correctamente.`);
      },
    });
  };

  const handleClearCart = () => {
    setConfirmModal({
      open: true,
      title: 'Vaciar carrito',
      message: '¿Seguro que deseas vaciar todo el carrito?',
      confirmText: 'Sí, vaciar',
      confirmClass: 'bg-red-600 hover:bg-red-700 text-white',
      onConfirm: () => {
        setCartItems([]);
        localStorage.setItem('briselli_cart', JSON.stringify([]));
        emitCartUpdate([]);
      },
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal((prev) => ({ ...prev, open: false }));
  };

  const handleConfirmModalAction = () => {
    if (typeof confirmModal.onConfirm === 'function') {
      confirmModal.onConfirm();
    }
    closeConfirmModal();
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-artisan-primary uppercase tracking-tighter">Mi Carrito</h2>
        <p className="text-gray-500 text-sm">Aquí puedes revisar y eliminar productos antes de comprar.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-orange-50 rounded-3xl">
          <span className="text-5xl block mb-4">🛒</span>
          <p className="text-gray-400 font-medium">Tu carrito está vacío.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-orange-100 hover:bg-orange-50/30 transition-colors"
            >
              <div className="w-full sm:w-20 h-44 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-black text-artisan-dark text-sm sm:text-base truncate">{item.name}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">{item.category}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-artisan-primary font-bold text-sm">
                    S/ {(Number(item.price) || 0).toFixed(2)}
                  </span>
                  <div className="inline-flex items-center rounded-xl border border-orange-200 overflow-hidden">
                    <button
                      onClick={() => handleChangeQuantity(item.id, -1)}
                      className="px-3 py-1.5 text-sm font-black text-[#8d4b00] hover:bg-orange-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-sm font-black text-artisan-dark bg-white min-w-10 text-center">
                      {Number(item.quantity) || 1}
                    </span>
                    <button
                      onClick={() => handleChangeQuantity(item.id, 1)}
                      className="px-3 py-1.5 text-sm font-black text-[#8d4b00] hover:bg-orange-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-sm font-black text-artisan-primary mb-2">
                  S/ {((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-3 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 mt-4 border-t border-orange-100 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">Total del carrito</span>
            <span className="text-xl font-black text-artisan-primary">S/ {totalGeneral.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleClearCart}
              className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-black uppercase tracking-widest text-sm hover:bg-red-100 transition-colors"
            >
              Vaciar carrito
            </button>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-xl bg-[#8d4b00] text-white font-black uppercase tracking-widest text-sm hover:bg-[#6e3900] transition-colors"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}

      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-orange-100 p-6">
            <h3 className="text-xl font-black text-artisan-primary tracking-tight mb-2">
              {confirmModal.title}
            </h3>
            <p className="text-gray-600 text-sm mb-6">{confirmModal.message}</p>
            <div className="flex gap-3">
              <button
                onClick={closeConfirmModal}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmModalAction}
                className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-colors ${confirmModal.confirmClass}`}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}