import {createSelector} from "reselect";
import {CategoriesState} from "./category.reducer";
import {CategoryMap} from "./category.types";

const selectCategoryReducer = (state): CategoriesState => state.categories;


export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

/**
 * The combiner will only run, if the state's categories property changes
 * and that only happens, if an action related to that is fired
 * otherwise it returns the memoized return value
 * */
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => categories.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
