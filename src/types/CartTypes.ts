export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "DECREASE_ITEM"; payload: number }
  | { type: "REMOVE_ITEM"; payload: number };
