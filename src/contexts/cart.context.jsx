import {createContext, useReducer} from "react";
import {createAction} from "../utils/reducer/reducer.utils";

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
      {...cartItem, quantity: cartItem.quantity - 1} :
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
  setIsCartOpen: () => {
  },
  cartItems: [],
  addItemToCart: () => {
  },
  cartCount: 0,
  removeItemFromCart: () => {
  },
  clearItemFromCart: () => {
  },
  total: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN"
};

const cartReducer = (state, action) => {
  const {type, payload} = action;
  
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
};

export const CartProvider = ({children}) => {
  // destructuring state inline
  const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  
  const addItemToCart = (productToAdd) => {
    const newCartItem = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItem);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItem = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItem);
  };
  const clearItemFromCart = (productToClear) => {
    const newCartItem = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItem);
  };
  
  const updateCartItemsReducer = (newCartItems) => {
    const newCartTotal = updateTotal(newCartItems);
    const newCartCount = updateCartCount(newCartItems);
    
    dispatch(
      createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS,
        {
          cartItems: newCartItems,
          cartTotal: newCartTotal,
          cartCount: newCartCount,
        }
      ))
  };
  
  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(
        CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN,
        bool
      ))
  };
  
  const providerProps = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };
  
  return <CartContext.Provider value={providerProps}>{children}</CartContext.Provider>
};
