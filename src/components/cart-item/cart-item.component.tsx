import {CartItemContainer, Img, ItemDetails, Name} from "./cart-item.styles";
import {CartItem as TCartItem} from "../../store/cart/cart.types";
import {FC, memo} from "react";

type CartItemProps = {
    cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <Img src={imageUrl} alt={name}/>
      <ItemDetails>
        <Name>{name}</Name>
        <span>{quantity} × ${price}</span>
      </ItemDetails>
    </CartItemContainer>
  )
});

export default CartItem;
