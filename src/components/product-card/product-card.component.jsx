import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {ProductCardContainer, Img, Name, Footer, Price} from "./product-card.styles";

const ProductCard = ({product}) => {
  const {name, price, imageUrl} = product;
  const { addItemToCart } = useContext(CartContext);
  
  const addProductToCart = () => addItemToCart(product);
  return (
    <ProductCardContainer>
      <Img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType="inverted" onClick={addProductToCart} >Add to cart</Button>
    </ProductCardContainer>
  )
};

export default ProductCard;
