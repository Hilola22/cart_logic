import React, { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import type { CartItem } from "../types/CartTypes";

const CartDisplay: React.FC = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("CartContext ishlatilmoqda lekin provider yo‘q");

  const { cartState, dispatch } = context;

  const handleAdd = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const handleDecrease = (id: number) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const totalPrice = cartState.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-lg p-4">
      <h2 className="text-xl font-bold mb-2">🛒 Your Cart</h2>

      {cartState.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cartState.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2"
            >
              <span className="font-medium">{item.name}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleAdd(item)}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  +
                </button>
              </div>

              <span className="text-gray-700 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 text-sm ml-2 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex justify-between font-bold">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartDisplay;
