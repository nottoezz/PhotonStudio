import { useCart } from '../context/useCart.js';


export default function TotalPrice() {
  const { total, count } = useCart();

  if (total <= 0) return null;
  return (
    <div className="total-price-floating">
      <h2 className="m-0">Cart • {count} item{count===1?'':'s'} • R {total.toFixed(2)}</h2>
    </div>
  );
}
