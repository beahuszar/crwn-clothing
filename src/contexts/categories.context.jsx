import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  
  useEffect(() => {
    /**
     * useEffect's callback cannot be async,
     * but a separate async function
     * has to be made inside of ot
     * */
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    
    getCategoriesMap();
  }, []);
  const contextProps = {categoriesMap};
  
  return <CategoriesContext.Provider value={contextProps}>{children}</CategoriesContext.Provider>
};
