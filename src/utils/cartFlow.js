const CART_KEY = "briselli_cart";
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

export function addProductToCartFlow(product) {
  const user = getCurrentUser();
  if (!user) {
    return { ok: false, message: "Debes iniciar sesión para comprar." };
  }

  const inventory = readJson(INVENTORY_KEY, []);
  let inventoryIndex = inventory.findIndex(
    (item) => normalizeText(item.name) === normalizeText(product.nombre)
  );

  if (inventoryIndex === -1) {
    inventory.push(buildInventoryItem(product));
    inventoryIndex = inventory.length - 1;
  }

  if ((Number(inventory[inventoryIndex].stock) || 0) <= 0) {
    return { ok: false, message: "Sin stock disponible en inventario." };
  }

  inventory[inventoryIndex] = {
    ...inventory[inventoryIndex],
    price: Number(product.precio) || Number(inventory[inventoryIndex].price) || 0,
  };
  writeJson(INVENTORY_KEY, inventory);

  const cart = readJson(CART_KEY, []);
  const cartIndex = cart.findIndex(
    (item) => normalizeText(item.name) === normalizeText(product.nombre)
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
      id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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

export function checkoutCartFlow() {
  const user = getCurrentUser();
  if (!user) return { ok: false, message: "Debes iniciar sesión para finalizar la compra." };

  const cart = readJson(CART_KEY, []);
  if (!cart.length) return { ok: false, message: "Tu carrito está vacío." };

  const inventory = readJson(INVENTORY_KEY, []);
  const inventoryByName = new Map(
    inventory.map((item) => [normalizeText(item.name), item])
  );

  for (const cartItem of cart) {
    const key = normalizeText(cartItem.name);
    const stockItem = inventoryByName.get(key);
    const requested = Number(cartItem.quantity) || 0;
    const available = Number(stockItem?.stock) || 0;
    if (!stockItem || requested <= 0 || available < requested) {
      return {
        ok: false,
        message: `Stock insuficiente para ${cartItem.name}. Disponible: ${available}.`,
      };
    }
  }

  const updatedInventory = inventory.map((item) => {
    const match = cart.find(
      (cartItem) => normalizeText(cartItem.name) === normalizeText(item.name)
    );
    if (!match) return item;
    return {
      ...item,
      stock: (Number(item.stock) || 0) - (Number(match.quantity) || 0),
    };
  });
  writeJson(INVENTORY_KEY, updatedInventory);

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
  const itemsText = cart
    .map((item) => `${Number(item.quantity) || 1}x ${item.name}`)
    .join(", ");

  const orders = readJson(ORDERS_KEY, []);
  const customerName =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.email ||
    "Cliente";
  const order = {
    id: `#${Date.now().toString().slice(-6)}`,
    customer: customerName,
    userEmail: user.email || "",
    date: new Date().toISOString(),
    total,
    status: "Pendiente",
    items: itemsText,
  };
  orders.unshift(order);
  writeJson(ORDERS_KEY, orders);

  writeJson(CART_KEY, []);
  window.dispatchEvent(
    new CustomEvent("briselli_cart_updated", {
      detail: { count: 0 },
    })
  );

  return { ok: true, message: "Compra realizada correctamente.", orderId: order.id };
}
