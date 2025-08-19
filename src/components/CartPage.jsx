import { useCart } from '../context/useCart.js';

export default function CartPage() {
  const { items, totalPrice, add, removeOne, removeAll, clear } = useCart();
  if (items.length === 0) {
    return (
      <div className="container py-4">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started.</p>
      </div>
    );
  }
  return (
    <div className="container py-4">
      <h2 className="mb-3">Your Cart</h2>
      <ul className="list-group mb-3">
        {items.map(item => (
          <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              {item.image && (
                <img src={item.image} alt={item.title} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
              )}
              <div>
                <div className="fw-semibold">{item.title}</div>
                <div className="text-muted small">${Number(item.price).toFixed(2)}</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary" onClick={() => removeOne(item.id)} aria-label={`Decrease ${item.title}`}>
                −
              </button>
              <span className="px-2" aria-live="polite">{item.qty}</span>
              <button className="btn btn-outline-secondary" onClick={() => add(item)} aria-label={`Increase ${item.title}`}>
                +
              </button>
              <button className="btn btn-outline-danger ms-2" onClick={() => removeAll(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-secondary" onClick={clear}>Clear Cart</button>
        <div className="fs-5">Total: ${totalPrice.toFixed(2)}</div>
      </div>
      <hr className="my-4" />
      <div>
        <button className="btn btn-primary btn-lg">Proceed to Payment (mock)</button>
        <p className="text-muted mt-2 mb-0 small">This is a demo checkout; no real payments occur.</p>
      </div>
    </div>
  );
}
