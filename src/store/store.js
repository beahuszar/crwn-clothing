import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "./root-saga";

const persistConfig = {
  key: "root",
  storage, // localStorage
  whitelist: ['cart']
  // dont persist categories reducer, because it is handled with spinner and async redux
  // dont persist user reducer, because it is coming from our auth state listener
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * run before the action hits the reducer when it has been dispatched
 * */
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
