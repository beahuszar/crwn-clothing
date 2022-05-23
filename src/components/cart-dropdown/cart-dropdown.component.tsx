import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
import {useCallback} from "react";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  // no need for dep "navigate", because it does not change ever
  const goToCheckoutHandler = useCallback(() => {
      navigate("/checkout");
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ?
            (cartItems.map(item => <CartItem key={item.id} cartItem={item} /> ))
            :
            <EmptyMessage>Your cart is empty</EmptyMessage>
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
};

export default CartDropdown;

