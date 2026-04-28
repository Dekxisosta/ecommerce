import { createContext, useContext, useEffect, useState } from "react";

// ── Context ───────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch ───────────────────────────────────────────────────────────────
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart", { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
      const data = await res.json();
      setCart(data.items ?? []);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ── Add ─────────────────────────────────────────────────────────────────
  const addItem = async (product_id, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product_id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { _pending: true, product_id, quantity }];
    });

    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id, quantity }),
      });
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      await fetchCart();
    }
  };

  // ── Change Qty ──────────────────────────────────────────────────────────
  const changeQty = async (itemId, delta) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) return removeItem(itemId);

    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );

    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
      });
      if (!res.ok) throw new Error(`Failed to update item: ${res.status}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
      await fetchCart();
    }
  };

  // ── Remove ──────────────────────────────────────────────────────────────
  const removeItem = async (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));

    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
      await fetchCart();
    }
  };

  // ── Clear ───────────────────────────────────────────────────────────────
  const clearCart = async () => {
    const ids = cart.map((i) => i.id);
    setCart([]);
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/cart/items/${id}`, {
            method: "DELETE",
            credentials: "include",
          })
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
      await fetchCart();
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────────
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce(
    (sum, i) => sum + (i.product?.price ?? 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        changeQty,
        clearCart,
        refetch: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}