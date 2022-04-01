import {createContext, useState} from "react";


export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const contextProps = {products, setProducts};
  
  return <ProductsContext.Provider value={contextProps}>{children}</ProductsContext.Provider>
};
