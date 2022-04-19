import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist";
/**
 * run before the action hits the reducer when it has been dispatched
 * */
const middleWares = [logger];

const persistConfig = {
  key: "root",
  storage, // localStorage
  blacklist: ['user'] // dont persist user reducer, because it is coming from our auth state listener
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);