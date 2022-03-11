import React from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";

export default class SignIn extends React.Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      email: "",
      password: "",
    }
  }
  
  handleSubmit = event => {
    event.preventDefault();
    
    this.setState({ email: "", password: "" });
  };
  
  handleChange = event => {
    const { value, name } = event.target;
    
    this.setState({ [name]: value });
  };
  
  render() {
    const { handleSubmit, handleChange } = this;
    const { email, password } = this.state;
    
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
  
        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            label="password"
            required
          />
          <input type="submit" value="Submit form"/>
        </form>
      </div>
    )
  }
}
