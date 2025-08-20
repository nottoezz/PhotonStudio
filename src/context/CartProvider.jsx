import { useEffect, useMemo, useState, useCallback } from 'react';
import { CartContext } from './cart-context.js';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart:v1');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!Array.isArray(items)) {
      setItems([]);
    }
  }, [items]);

  useEffect(() => {
    if (Array.isArray(items)) {
      localStorage.setItem('cart:v1', JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((item) => {
    const key = `${item.id}:${item.colour ?? 'default'}`;
    setItems((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      const idx = list.findIndex((it) => it.key === key);
      if (idx >= 0) {
        const next = [...list];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...list, { ...item, key, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => (Array.isArray(prev) ? prev.filter((it) => it.key !== key) : []));
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      const next = list.map((it) => (it.key === key ? { ...it, qty } : it));
      return next.filter((it) => it.qty > 0);
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return list.reduce((s, it) => s + it.qty, 0);
  }, [items]);

  const total = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return list.reduce((s, it) => s + it.price * it.qty, 0);
  }, [items]);

  // Backwards compatibility
  const addToTotal = useCallback((amount) => {
    addItem({ id: Math.random().toString(36).slice(2), title: 'Item', price: amount });
  }, [addItem]);

  const value = useMemo(
    () => ({ items: Array.isArray(items) ? items : [], addItem, removeItem, updateQty, clearCart, count, total, addToTotal }),
    [items, addItem, removeItem, updateQty, clearCart, count, total, addToTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
