import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CheckoutContainer, Header, HeaderBlock, Total} from "./checkout.styles";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const {cartItems, total} = useContext(CartContext);
  
  return (
    <CheckoutContainer>
      <Header>
        <HeaderBlock>
          <span>
            Product
          </span>
        </HeaderBlock>
        <HeaderBlock>
          <span>
            Description
          </span>
        </HeaderBlock>
        <HeaderBlock>
          <span>
            Quantity
          </span>
        </HeaderBlock>
        <HeaderBlock>
          <span>
            Price
          </span>
        </HeaderBlock>
        <HeaderBlock>
          <span>
            Remove
          </span>
        </HeaderBlock>
      </Header>
      {cartItems.map((item) => (<CheckoutItem key={item.id} cartItem={item}/>))}
      <Total>Total: ${total}</Total>
    </CheckoutContainer>
  )
};

export default Checkout;
