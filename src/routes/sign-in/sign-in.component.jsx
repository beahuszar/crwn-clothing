import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const saveGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  
  return (
    <div>
      <h1>signinpage</h1>
      <button onClick={saveGoogleUser}>Sign in with Google Popup</button>
    </div>
  )
};

export default SignIn;
