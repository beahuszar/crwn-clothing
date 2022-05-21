import {CartIconContainer, ItemCount, ShoppingIconSvg} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  
  const cartOpenHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };
  
  return (
    <CartIconContainer onClick={cartOpenHandler}>
      <ShoppingIconSvg/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon;
