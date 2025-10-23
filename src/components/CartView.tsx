import React, { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import type { Product } from "../types/CartTypes";

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1200,
    image:
      "https://castore.uz/upload/iblock/a83/fo327mwzjbo4bbcztrl6cg1zzpx7pj0y/smartfon-apple-iphone-15-pro-max-1tb-blue-titanium.jpg",
  },
  {
    id: 2,
    name: "MacBook Air M3",
    price: 1800,
    image:
      "https://assets.asaxiy.uz/product/items/desktop/10edafd3bf9ecd4ef58a8548a9aa1fad2024081511170714285n9r9is9O4Z.webp",
  },
  {
    id: 3,
    name: "Apple Watch Ultra",
    price: 800,
    image:
      "https://web.openshop.uz/storage/uploads/products/photos/202312/9jXiYzJOkE2OorWbYRb5V4CMLcpUzbkusZuhAIcr.jpg",
  },
];

const CartView: React.FC = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("CartContext ishlatilmoqda lekin provider yo‘q");

  const { cartState, dispatch } = context;

  const handleAdd = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handleDecrease = (id: number) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

  const isInCart = (id: number) =>
    cartState.items.find((item) => item.id === id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => {
        const itemInCart = isInCart(product.id);

        return (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col items-center transition-transform hover:scale-105 p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-xl"
            />
            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="text-gray-500 mb-3">${product.price}</p>

            {itemInCart ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrease(product.id)}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                >
                  -
                </button>
                <span className="font-semibold">{itemInCart.quantity}</span>
                <button
                  onClick={() => handleAdd(product)}
                  className="bg-black text-white px-3 py-1 rounded-lg text-lg"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAdd(product)}
                className="bg-black text-white px-5 py-2 rounded-xl mt-2 hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CartView;
