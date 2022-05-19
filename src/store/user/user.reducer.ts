import {UserData} from "../../utils/firebase/firebase.utils";
import {AnyAction} from "redux";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

/**
 * all reducers are called for every action dispatched
 * thus there must be a default case when the same state is returned
 * */
export const userReducer = (
    state = INITIAL_STATE,
    action: AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload
    }
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null
    };
  }

  if (signOutFailed.match(action)
      || signUpFailed.match(action)
      || signInFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload
    };
  }

  // return the same state, so that it does not trigger render
  return state;
};
