import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getCart,
  addToCart
} from "../api/cartApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
  });

  // Cart database se fetch karta hai (Token check ke sath)
  const fetchCart = async () => {
    const token = localStorage.getItem("accessToken");
    
    // Agar user logged in hi nahi hai, toh API call mat karo
    if (!token) {
      setCart({ items: [] });
      return;
    }

    try {
      const res = await getCart();

      if (res.success) {
        setCart(res.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Agar token invalid/expired ho toh localstorage clear kar sakte hain ya empty cart set kar sakte hain
      if (error.response && error.response.status === 401) {
        setCart({ items: [] });
      }
    }
  };

  // Add to cart + Context ko turant update karega
  const handleAddToCart = async (cartData) => {
    try {
      const res = await addToCart(cartData);

      if (res.success) {
        setCart(res.data);
      }

      return res;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const cartCount = cart?.items ? cart.items.length : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        fetchCart,
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}