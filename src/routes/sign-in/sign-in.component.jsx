import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const saveGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  
  return (
    <div>
      <h1>signinpage</h1>
      <button onClick={saveGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  )
};

export default SignIn;
