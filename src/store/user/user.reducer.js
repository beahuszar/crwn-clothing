export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER"
};

const INITIAL_STATE = {
  currentUser: null,
};

/**
 * all reducers are called for every action dispatched
 * thus there must be a default case when the same state is returned
 * */
export const userReducer = (state = INITIAL_STATE, action) => {
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
      // return the same state, so that it does not trigger render
      return state;
  }
};
