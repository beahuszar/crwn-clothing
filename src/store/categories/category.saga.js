import {all, call, put, takeLatest} from "redux-saga/effects"
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {CATEGORIES_ACTION_TYPES} from "./category.types";
import {fetchCategoriesFailure, fetchCategoriesSuccess} from "./category.action";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    // put === generator version of dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // run everything inside and only complete when all of it is done
  yield all([call(onFetchCategories)]);
}
