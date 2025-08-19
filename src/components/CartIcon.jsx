import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';

export default function CartIcon() {
  const { totalItems } = useCart();
  return (
    <Link to="/cart" className="position-relative d-inline-flex align-items-center text-decoration-none">
      <span className="material-icons">shopping_cart</span>
      {totalItems > 0 && (
        <span
          className="badge bg-danger position-absolute translate-middle"
          style={{ top: 0, right: 0 }}
          aria-label={`${totalItems} items in cart`}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
