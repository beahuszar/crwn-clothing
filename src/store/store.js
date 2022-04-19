import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist";
/**
 * run before the action hits the reducer when it has been dispatched
 * */
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean);

const persistConfig = {
  key: "root",
  storage, // localStorage
  blacklist: ['user'] // dont persist user reducer, because it is coming from our auth state listener
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
