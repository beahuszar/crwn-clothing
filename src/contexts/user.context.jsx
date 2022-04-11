import {createContext, useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";
import {createAction} from "../utils/reducer/reducer.utils";

/*
* This will create a React context provider component (see below)
* that will need an object and its setter from useState
* so whenever that prop changes in any of the children, all children rerender consequently
* */
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER"
};

const userReducer = (state, action) => {
  console.log("dispatched");
  console.log(action);
  const { type, payload } = action;
  
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      };
    default:
      throw new Error(`Unhandled type ${type} in UserReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const {currentUser} = state;
  console.log(currentUser);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  };
  
  /*
  * This is passed into the context, so that the children can access it
  * and will be connected to the prop and setter in the defaultValue of the context
  * thus whenever the context's setter is called, this useState will enforce rerender this component and the children
  * */
  const value = { currentUser, setCurrentUser };
  
  // componentDidMount
  /*
  * i.e.: componentDidMount
  * onAuthChange returns an unsubscribe method
  * useEffect return is called whenever component unmounts -> good for clearing up such listeners
  * */
  useEffect(() => {
   const unsubscribe = onAuthStateChangedListener((user) => {
     if (user) {
       createUserDocumentFromAuth(user);
     }
     setCurrentUser(user);
   });
   return unsubscribe;
  }, []);
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
