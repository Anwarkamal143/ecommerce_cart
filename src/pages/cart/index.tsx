import Product from "components/cart";
import { useShoppingCart } from "hooks/contexthooks/useShoppingCart";

type Props = {};

const Cart = (props: Props) => {
  const { cartItems, totalPrice } = useShoppingCart();

  return (
    <div className="space-y-4 ">
      {cartItems.map((p) => {
        return <Product key={p.id} product={p.item} />;
      })}
      <p className="font-bold text-lg text-right p-6">Total: ${totalPrice}</p>
    </div>
  );
};

export default Cart;
