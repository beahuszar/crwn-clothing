import {all, call, put, takeLatest} from "typed-redux-saga/macro";
import {USER_ACTION_TYPES} from "./user.types";
import {
  EmailSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed, SignUpStart, SignUpSuccess,
  signUpSuccess
} from "./user.action";
import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup, signOutUser
} from "../../utils/firebase/firebase.utils";
import {User} from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapShot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);

    if (userSnapShot) {
      yield* put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
    }
  } catch (e) {
    yield* put(signInFailed(e as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth)
  } catch (e) {
    yield* put(signInFailed(e as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const {user} = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (e) {
    yield* put(signInFailed(e as Error));
  }
}

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart) {
  try {
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      yield* call(getSnapshotFromUserAuth, userCredential.user);
    }
  } catch (e) {
    yield* put(signInFailed(e as Error));
  }
}

export function* signUp({payload: {email, password, displayName}}: SignUpStart) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      yield* put(signUpSuccess(userCredential.user, {displayName}));
    }
  } catch (e) {
    yield* put(signUpFailed(e as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (e) {
    yield* put(signOutFailed(e as Error));
  }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
