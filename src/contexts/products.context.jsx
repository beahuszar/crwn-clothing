import {createContext, useState} from "react";
import SHOP_DATA from "../shop-data.json";


export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const contextProps = {products, setProducts};
  
  return <ProductsContext.Provider value={contextProps}>{children}</ProductsContext.Provider>
};
