import React from "react";
import "./sign-in.styles.scss";

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
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
  
          <input type="submit" value="Submit form"/>
        </form>
      </div>
    )
  }
}
