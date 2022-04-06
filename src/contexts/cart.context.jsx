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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ?
      { ...cartItem, quantity: cartItem.quantity - 1 } :
      cartItem
  );
};

const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(item => item.id !== cartItemToRemove.id);

const updateCartCount = (cartItems) => cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);

const updateTotal = (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  total: 0,
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  
  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };
  
  // one useEffect should be responsible for 1 task
  useEffect(() => {
    setCartCount(updateCartCount(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    setTotal(updateTotal(cartItems));
  }, [cartItems]);
  
  const providerProps = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, total};
  
  return <CartContext.Provider value={providerProps}>{children}</CartContext.Provider>
};
