import {createContext, useState} from "react";

/*
* This will create a React context provider component (see below)
* that will need an object and its setter from useState
* so whenever that prop changes in any of the children, all children rerender consequently
* */
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  /*
  * This is passed into the context, so that the children can access it
  * and will be connected to the prop and setter in the defaultValue of the context
  * thus whenever the context's setter is called, this useState will enforce rerender this component and the children
  * */
  const value = { currentUser, setCurrentUser };
  
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
