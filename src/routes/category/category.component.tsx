import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryContainer, CategoryTitle} from "./category.styles";
import {useSelector} from "react-redux";
import {selectCategoriesMap, selectCategoriesIsLoading} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

type CategoryRouteParams = {
  category: string;
}

const Category = () => {
  // useParams retrieves value from the value added to Route path=":abcd"
  const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading ?
          <Spinner/> :
          <CategoryContainer>
            {products &&
            products.map(product => <ProductCard key={product.id} product={product}/>)
            }
          </CategoryContainer>
      }
    </Fragment>
  )
};

export default Category;
