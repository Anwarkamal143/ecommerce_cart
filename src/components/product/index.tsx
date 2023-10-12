import { Button } from "components/Button";
import Image from "components/Image";
import { useShoppingCart } from "hooks/contexthooks/useShoppingCart";

type Props = {
  product: IProduct;
};

const Cart = (props: Props) => {
  const { product } = props;
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(product.id);

  return (
    <div className="lg:!w-72 md:!w-60 !h-auto p-4">
      <div className="border-r flex-col border-b border-l border-gray-400  lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex justify-between   leading-normal">
        <div className="mb-8 flex flex-col">
          <Image
            src={product.img}
            className="!h-48 lg:!h-56 bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          />
          <div className="fpl-4">
            <h1 className="font-bold text-xl w-full ">{product.name}</h1>
            <p className=" text-gray-800 text-right">${product.price}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center">
          {quantity !== 0 ? (
            <>
              <div className="space-x-2">
                <Button
                  size={"small"}
                  variant={"destructive"}
                  onClick={() => decreaseCartQuantity(product.id)}
                >
                  -
                </Button>
                <span className="font-bold text-lg">{quantity} </span>
                <Button
                  size={"small"}
                  onClick={() => increaseCartQuantity(product.id, product)}
                >
                  +
                </Button>
              </div>
              <Button onClick={() => removeFromCart(product.id)}>Remove</Button>
            </>
          ) : (
            <Button onClick={() => increaseCartQuantity(product.id, product)}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
