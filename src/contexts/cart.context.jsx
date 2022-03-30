import {createContext, useState} from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setOpen: () => {}
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const providerProps = {isCartOpen, setIsCartOpen};
  
  return <CartContext.Provider value={providerProps}>{children}</CartContext.Provider>
};
