import React from "react";
import { CartProvider } from "./context/CartContextProvider";
import CartView from "./components/CartView";
import CartDisplay from "./components/CartDisplay";

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center py-6">iKafil Store</h1>
        <CartView />
        <CartDisplay />
      </div>
    </CartProvider>
  );
};

export default App;
