import {Category} from "./category.types";
import {fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess} from "./category.action";
import {AnyAction} from "redux";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};


/**
 * Type safer, in prev version, default "state" return type could have been deleted without errors, which can lead to
 * runtime errors
 * */
export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {...state, isLoading: true};
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {...state, categories: action.payload, isLoading: false};
  }

  if (fetchCategoriesFailure.match(action)) {
    return {...state, isLoading: false, error: action.payload};
  }

  return state;
};
