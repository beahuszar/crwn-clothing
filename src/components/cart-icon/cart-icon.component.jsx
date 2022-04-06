import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartIconContainer, ShoppingIconSvg, ItemCount} from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
  
  return (
    <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <ShoppingIconSvg/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon;
