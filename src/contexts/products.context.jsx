import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";


export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    /**
     * useEffect's callback cannot be async,
     * but a separate async function
     * has to be made inside of ot
     * */
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
    };
    
    getCategoriesMap();
  }, []);
  const contextProps = {products, setProducts};
  
  return <ProductsContext.Provider value={contextProps}>{children}</ProductsContext.Provider>
};
