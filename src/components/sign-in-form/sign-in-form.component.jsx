import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";
import {useState} from "react";
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;
  
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          alert("INCORRECT PASSWORD");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.error("SIGNIN FAILED: ", e.message);
      }
    }
  };
  
  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google sign
            in</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
};

export default SignInForm;
