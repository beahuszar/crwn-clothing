import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {CategoryItem} from "../categories/category.types";

const addCartItem = (
    cartItems: CartItem[],
    productToAdd: CategoryItem
): CartItem[] => {
  const existingItem = cartItems.find(item => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map(item => (item.id === productToAdd.id ?
        {...item, quantity: item.quantity + 1} :
        item
    ))
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (
    cartItems: CartItem[],
    cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ?
      {...cartItem, quantity: cartItem.quantity - 1} :
      cartItem
  );
};

const clearCartItem = (
    cartItems: CartItem[],
    cartItemToRemove: CartItem
): CartItem[] => cartItems.filter(item => item.id !== cartItemToRemove.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen=>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItem = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItem);
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  const newCartItem = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItem);
};

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
  const newCartItem = clearCartItem(cartItems, productToClear);
  return setCartItems(newCartItem);
};
