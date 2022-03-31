import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(item => item.id === productToAdd.id);
  
  if (existingItem) {
    return cartItems.map(item => (item.id === productToAdd.id ?
        {...item, quantity: item.quantity + 1} :
        item
    ))
  }
  
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const updateCartCount = (cartItems) => cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  
  useEffect(() => {
    setCartCount(updateCartCount(cartItems));
  }, [cartItems]);
  
  const providerProps = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};
  
  return <CartContext.Provider value={providerProps}>{children}</CartContext.Provider>
};
