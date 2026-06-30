export const CART_KEY = "briselli_cart";
const INVENTORY_KEY = "briselli_inventory";
const ORDERS_KEY = "briselli_orders";
const AUTH_SESSION_KEY = "briselli_auth_session";
const AUTH_LEGACY_KEY = "briselli_auth";

function readJson(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCartUnits(cart) {
  return cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function getCurrentUser() {
  try {
    const session = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (session) return JSON.parse(session);
  } catch {
    // ignore
  }
  return readJson(AUTH_LEGACY_KEY, null);
}

function buildInventoryItem(product) {
  return {
    id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: product.nombre,
    category: product.categoria || "General",
    price: Number(product.precio) || 0,
    stock: 20,
    image: product.img || "",
  };
}

import { orderService } from '../services/orderService';

export function addProductToCartFlow(product) {
  const cart = readJson(CART_KEY, []);
  const cartIndex = cart.findIndex(
    (item) => item.id === product.id || normalizeText(item.name) === normalizeText(product.nombre)
  );
  
  if (cartIndex >= 0) {
    const currentQty = Number(cart[cartIndex].quantity) || 0;
    cart[cartIndex] = {
      ...cart[cartIndex],
      quantity: currentQty + 1,
      total: (currentQty + 1) * Number(product.precio || 0),
    };
  } else {
    cart.push({
      id: product.id || `cart-${Date.now()}`,
      name: product.nombre,
      category: product.categoria || "General",
      price: Number(product.precio) || 0,
      quantity: 1,
      total: Number(product.precio) || 0,
      image: product.img || "",
    });
  }
  
  writeJson(CART_KEY, cart);
  const cartUnits = getCartUnits(cart);
  window.dispatchEvent(
    new CustomEvent("briselli_cart_updated", {
      detail: { count: cartUnits },
    })
  );

  return { ok: true, message: "Producto agregado al carrito.", cartCount: cartUnits };
}

export function removeProductFromCartFlow(productId) {
  let cart = readJson(CART_KEY, []);
  cart = cart.filter(item => item.id !== productId);
  writeJson(CART_KEY, cart);
  
  const cartUnits = getCartUnits(cart);
  window.dispatchEvent(
    new CustomEvent("briselli_cart_updated", {
      detail: { count: cartUnits },
    })
  );
  return cart;
}

export function updateProductQuantityFlow(productId, change) {
  let cart = readJson(CART_KEY, []);
  const index = cart.findIndex(item => item.id === productId);
  
  if (index >= 0) {
    const currentQty = Number(cart[index].quantity) || 1;
    const newQty = currentQty + change;
    
    if (newQty >= 1) {
      cart[index].quantity = newQty;
      cart[index].total = newQty * (Number(cart[index].price) || 0);
      writeJson(CART_KEY, cart);
      
      const cartUnits = getCartUnits(cart);
      window.dispatchEvent(
        new CustomEvent("briselli_cart_updated", {
          detail: { count: cartUnits },
        })
      );
    }
  }
  return cart;
}

export async function checkoutCartFlow(shippingInfo) {
  const user = getCurrentUser();
  if (!user) return { ok: false, message: "Debes iniciar sesión para finalizar la compra." };

  const cart = readJson(CART_KEY, []);
  if (!cart.length) return { ok: false, message: "Tu carrito está vacío." };

  try {
    const payloadItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    const orderData = {
      userId: user.id || 1, // Fallback to 1 if no user.id
      items: payloadItems,
      deliveryAddress: shippingInfo?.address || '',
      deliveryPhone: shippingInfo?.phone || '',
      deliveryNotes: shippingInfo?.notes || ''
    };

    const res = await orderService.createOrder(orderData);

    writeJson(CART_KEY, []);
    window.dispatchEvent(
      new CustomEvent("briselli_cart_updated", {
        detail: { count: 0 },
      })
    );

    return { ok: true, message: "Compra realizada correctamente.", orderId: res.id };
  } catch (error) {
    console.error("Checkout error:", error);
    const backendMsg = error.response?.data?.message || error.response?.data || error.message;
    return { ok: false, message: `Error: ${backendMsg}` };
  }
}
