import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CheckoutItemContainer, Img, Arrow, ImgContainer, QuantityContainer, ItemDetail, RemoveButton, Value} from "./checkout-item.styles";

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;
  const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
  
  const addHandler = () => addItemToCart(cartItem);
  
  const removeHandler = () => removeItemFromCart(cartItem);
  
  const clearHandler = () => clearItemFromCart(cartItem);
  
  return (
    <CheckoutItemContainer>
      <ImgContainer>
        <Img src={imageUrl} alt={name}/>
      </ImgContainer>
      <ItemDetail>{name}</ItemDetail>
      <QuantityContainer>
        <Arrow onClick={removeHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addHandler}>
          &#10095;
        </Arrow>
      </QuantityContainer>
      <ItemDetail>{price}</ItemDetail>
      <RemoveButton onClick={clearHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
};

export default CheckoutItem;
