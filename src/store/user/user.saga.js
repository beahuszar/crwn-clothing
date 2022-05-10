import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_ACTION_TYPES} from "./user.types";
import {signInFailed, signInSuccess} from "./user.action";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
    yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
  } catch (e) {
    yield put(signInFailed(e));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (e) {
    yield put(signInFailed(e));
  }
}

export function* signInWithGoogle() {
  try {
    const {user} = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (e) {
    yield put(signInFailed(e));
  }
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
    const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (e) {
    yield put(signInFailed(e));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
