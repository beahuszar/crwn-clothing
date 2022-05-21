import {CartItemContainer, Img, ItemDetails, Name} from "./cart-item.styles";
import {CartItem} from "../../store/cart/cart.types";
import {FC} from "react";

type CartItemProps = {
    cartItem: CartItem
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
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
};

export default CartItem;
