import { useState } from 'react';
import CartDrawer from './CartDrawer.jsx';
import { useCart } from '../context/useCart.js';

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <button className="cart-btn" onClick={() => setOpen(true)} aria-label="Open cart">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44c-.22.4-.25.86-.08 1.27.17.41.52.71.93.82.12.03.25.04.37.04h9v-2h-8.42c-.05 0-.1-.03-.12-.08l.03-.06.9-1.65h5.71c.75 0 1.41-.42 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1h-14zm1 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <span>Cart</span>
        {count > 0 && <span className="cart-badge" aria-label={`${count} items in cart`}>{count}</span>}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
