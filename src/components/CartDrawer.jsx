import { useCart } from '../context/useCart.js';

export default function CartDrawer({ open, onClose }) {
  const { items, total, removeItem, updateQty, clearCart } = useCart();

  return (
    <div className={`cart-drawer ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="cart-drawer__backdrop" onClick={onClose} />
      <div className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <h3>Shopping Cart</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="muted">Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {items.map((it) => (
              <li key={it.key} className="cart-item">
                <img src={it.img} alt={it.title} />
                <div className="cart-item__info">
                  <div className="cart-item__title">{it.title}</div>
                  {it.colour && <div className="muted small">Colour: {it.colour}</div>}
                  <div className="cart-item__price">R {it.price.toFixed(2)}</div>
                </div>
                <div className="cart-item__qty">
                  <button className="icon-btn" onClick={() => updateQty(it.key, it.qty - 1)} aria-label="Decrease quantity">−</button>
                  <span aria-live="polite">{it.qty}</span>
                  <button className="icon-btn" onClick={() => updateQty(it.key, it.qty + 1)} aria-label="Increase quantity">+</button>
                </div>
                <button className="icon-btn danger" onClick={() => removeItem(it.key)} aria-label="Remove item">🗑</button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-drawer__footer">
          <div className="cart-total">
            <span>Total:</span>
            <strong>R {total.toFixed(2)}</strong>
          </div>
          <div className="cart-actions">
            <button className="btn" onClick={clearCart} disabled={!items.length}>Clear</button>
            <button className="btn btn--primary" disabled={!items.length} onClick={() => alert('This is a demo checkout 🤝')}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
