import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuthSession } from '../../utils/authSession';
import { checkoutCartFlow, removeProductFromCartFlow, updateProductQuantityFlow, CART_KEY } from '../../utils/cartFlow';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  
  // Checkout Info
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    phone: '',
    notes: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const session = getAuthSession();
    setUser(session);
    
    if (session) {
      setShippingInfo(prev => ({
        ...prev,
        address: session.address || '',
        phone: session.phone || ''
      }));
    }

    try {
      const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      setCartItems(items);
    } catch (error) {
      console.error(error);
      setCartItems([]);
    }
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleNextStep = () => {
    if (step === 1 && !user) {
      alert("Por favor inicia sesión para continuar con la compra.");
      navigate('/login');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleFinalizePurchase = async () => {
    setLoading(true);

    try {
      // 1. Actually create the order in Backend (Status PENDIENTE)
      const result = await checkoutCartFlow(shippingInfo);
      
      if (!result.ok) {
        alert(result.message);
        setLoading(false);
        return;
      }
      
      const createdOrderId = result.orderId;

      const expYearRaw = paymentData.expiry.split('/')[1]?.trim() || '';
      const expYear = expYearRaw.length === 2 ? `20${expYearRaw}` : expYearRaw;

      // 2. Generate Token with Culqi API
      const culqiResponse = await fetch('https://secure.culqi.com/v2/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_CULQI_PUBLIC_KEY}`
        },
        body: JSON.stringify({
          card_number: paymentData.cardNumber.replace(/\s/g, ''),
          cvv: paymentData.cvc,
          expiration_month: paymentData.expiry.split('/')[0]?.trim(),
          expiration_year: expYear,
          email: user?.email || 'cliente@briselli.com'
        })
      });

      const culqiData = await culqiResponse.json();

      if (!culqiResponse.ok) {
        throw new Error(culqiData.user_message || 'Error al procesar la tarjeta con Culqi.');
      }

      // 3. Send Charge to Backend
      const token = localStorage.getItem('briselli_token');
      const backendBaseUrl = import.meta.env.VITE_API_URL;
      
      const chargeResponse = await fetch(`${backendBaseUrl}/payments/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: createdOrderId,
          culqiToken: culqiData.id,
          email: user?.email || 'cliente@briselli.com'
        })
      });

      if (!chargeResponse.ok) {
        throw new Error('Error al confirmar el cobro en el servidor.');
      }

      setOrderId(createdOrderId);
      setStep(4);

    } catch (error) {
      alert(`Error en el pago: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] pt-24 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-black text-[#6f4014] mb-4">Tu carrito está vacío</h2>
        <p className="text-[#51443b] mb-8">Descubre nuestros deliciosos pasteles y postres.</p>
        <Link to="/postres" className="px-8 py-3 bg-[#8d4b00] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#6e3900] transition-colors">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f5] font-sans text-[#1b1c1a] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-orange-200 -z-10 rounded-full" />
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#8d4b00] -z-10 transition-all duration-500 rounded-full`} style={{ width: `${((step - 1) / 3) * 100}%` }} />
          
          {['Resumen', 'Envío', 'Pago', 'Confirmación'].map((label, idx) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= idx + 1 ? 'bg-[#8d4b00] text-white shadow-lg' : 'bg-white text-orange-300 border-2 border-orange-200'}`}>
                {idx + 1}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${step >= idx + 1 ? 'text-[#8d4b00]' : 'text-orange-300'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Summary */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100/50">
            <h2 className="text-2xl font-black text-[#6f4014] mb-6">Resumen del Carrito</h2>
            <div className="space-y-4 mb-8">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-2xl">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#6f4014] text-lg">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => setCartItems(updateProductQuantityFlow(item.id, -1))}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full bg-orange-100 text-[#8d4b00] font-bold hover:bg-orange-200 transition-colors flex items-center justify-center disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="font-black text-[#6f4014] w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => setCartItems(updateProductQuantityFlow(item.id, 1))}
                        className="w-8 h-8 rounded-full bg-orange-100 text-[#8d4b00] font-bold hover:bg-orange-200 transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="font-black text-[#8d4b00]">S/ {(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => {
                        const newCart = removeProductFromCartFlow(item.id);
                        setCartItems(newCart);
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center"
                      title="Eliminar producto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-orange-100">
              <span className="text-xl font-bold text-[#51443b]">Total a pagar:</span>
              <span className="text-3xl font-black text-[#8d4b00]">S/ {totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={handleNextStep} className="px-8 py-4 bg-[#8d4b00] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#6e3900] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                Continuar Compra
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Shipping */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100/50">
            <h2 className="text-2xl font-black text-[#6f4014] mb-2">Información de Envío</h2>
            <p className="text-[#51443b] mb-6">Confirma los datos para la entrega de tu pedido.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#6f4014] mb-2">Nombre del Cliente</label>
                <input type="text" readOnly value={`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.email || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#6f4014] mb-2">Dirección de Entrega</label>
                <input 
                  type="text" 
                  value={shippingInfo.address}
                  onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})}
                  placeholder="Ej: Av. Los Rosales 123, Surco" 
                  className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8d4b00] focus:ring-1 focus:ring-[#8d4b00] transition-colors" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#6f4014] mb-2">Teléfono de Contacto</label>
                  <input 
                    type="tel" 
                    maxLength="9"
                    value={shippingInfo.phone}
                    onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value.replace(/\D/g, '').slice(0, 9)})}
                    placeholder="Ej: 987654321" 
                    className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8d4b00]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#6f4014] mb-2">Notas Especiales</label>
                  <input 
                    type="text" 
                    value={shippingInfo.notes}
                    onChange={e => setShippingInfo({...shippingInfo, notes: e.target.value})}
                    placeholder="Ej: Tocar timbre 2 veces" 
                    className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8d4b00]" 
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-3 text-[#8d4b00] font-bold hover:bg-orange-50 rounded-full transition-colors">
                Volver
              </button>
              <button onClick={handleNextStep} disabled={!shippingInfo.address || shippingInfo.phone.length !== 9} className="px-8 py-3 bg-[#8d4b00] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#6e3900] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                Ir al Pago
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100/50 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-[#6f4014] mb-2">Método de Pago</h2>
              <p className="text-[#51443b]">Estás pagando <span className="font-bold text-[#8d4b00]">S/ {totalAmount.toFixed(2)}</span> de forma segura mediante Culqi.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <div className="mb-4 flex justify-between items-center">
                <span className="font-bold text-slate-700">Tarjeta de Crédito / Débito</span>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold text-white italic">VISA</div>
                  <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center text-[8px] font-bold text-white">MC</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    maxLength="19"
                    placeholder="Número de Tarjeta" 
                    value={paymentData.cardNumber}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                      setPaymentData({...paymentData, cardNumber: formatted});
                    }}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white font-mono text-lg tracking-widest" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    maxLength="5"
                    placeholder="MM/YY" 
                    value={paymentData.expiry}
                    onChange={e => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length >= 3) {
                        val = val.slice(0,2) + '/' + val.slice(2,4);
                      }
                      setPaymentData({...paymentData, expiry: val});
                    }}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white font-mono text-center tracking-widest" 
                  />
                  <input 
                    type="text" 
                    maxLength="4"
                    placeholder="CVC" 
                    value={paymentData.cvc}
                    onChange={e => setPaymentData({...paymentData, cvc: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white font-mono text-center tracking-widest" 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Nombre en la tarjeta" 
                    value={paymentData.name}
                    onChange={e => setPaymentData({...paymentData, name: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white uppercase" 
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button onClick={() => setStep(2)} className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-full transition-colors">
                Volver
              </button>
              <button 
                onClick={handleFinalizePurchase} 
                disabled={loading || paymentData.cardNumber.replace(/\s/g, '').length < 15 || paymentData.expiry.length < 5 || paymentData.cvc.length < 3 || !paymentData.name}
                className="px-8 py-4 bg-emerald-600 text-white rounded-full font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Procesando...</span>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Pagar Seguro
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-orange-100/50 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-black text-[#6f4014] mb-2">¡Compra Exitosa!</h2>
            <p className="text-[#51443b] mb-6">Tu pedido ha sido procesado y te hemos enviado un correo con los detalles.</p>
            
            <div className="bg-orange-50 p-4 rounded-xl mb-8 inline-block">
              <span className="text-sm font-bold text-orange-800 uppercase tracking-widest block mb-1">N° de Orden</span>
              <span className="text-2xl font-black text-[#8d4b00]">#{String(orderId).padStart(5, '0')}</span>
            </div>

            <div>
              <Link to="/account/orders" className="block w-full py-4 bg-[#8d4b00] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#6e3900] transition-colors shadow-md mb-3">
                Ver mis Pedidos
              </Link>
              <Link to="/" className="block w-full py-3 text-[#8d4b00] font-bold hover:bg-orange-50 rounded-full transition-colors">
                Volver a la tienda
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
