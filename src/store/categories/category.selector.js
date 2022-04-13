import {createSelector} from "reselect";

const selectCategoryReducer = (state) => state.categories;


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
  (categories) => categories.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
