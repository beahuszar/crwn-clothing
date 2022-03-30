import {createContext, useState} from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setOpen: () => {},
  cartItems: [],
  addItemToCart: () => {}
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  
  const providerProps = {isCartOpen, setIsCartOpen, cartItems, addItemToCart};
  
  return <CartContext.Provider value={providerProps}>{children}</CartContext.Provider>
};
