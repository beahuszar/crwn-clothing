import {
  Arrow,
  CheckoutItemContainer,
  Img,
  ImgContainer,
  ItemDetail,
  QuantityContainer,
  RemoveButton,
  Value
} from "./checkout-item.styles";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, clearItemFromCart, removeItemFromCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";

const CheckoutItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {name, imageUrl, price, quantity} = cartItem;
  
  const addHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  
  const removeHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  
  const clearHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
  
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
