import React, {
  createContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type { CartState, CartAction } from "../types/CartTypes";

interface CartContextType {
  cartState: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "DECREASE_ITEM":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
