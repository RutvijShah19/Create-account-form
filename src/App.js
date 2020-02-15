import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formError, ...rest }) => {
  let valid = true;

  Object.values(formError).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor() {
      super();
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        formError: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }
      }
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    let { formError } = this.state;

    this.setState({[name] : value});

    switch (name) {
      case 'firstName':
          formError.firstName = value.length < 3 ? 'Minimum 3 characters required' : '';
        break;
      case 'lastName':
          formError.lastName = value.length < 3 ? 'Minimum 3 characters required' : '';
          break;
      case 'email':
          formError.email = emailRegex.test(value) && value.length > 0 ? '' : 'Invalid Email';
          break;
      case 'password':
          formError.password = value.length < 3 ? 'Minimum 3 characters required' : '';
          break;
      default:
          break;
    }

    this.setState({ formError, [name]: value});
  }

  onFormSubmit = event => {
    event.preventDefault();

    if(formValid(this.state)) {
      console.log('Form Submitted');
    } else {
      console.log('Error in form');
    }
  }

  render() {
    const { firstName, lastName, email, password, formError } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="firstName">
            <label htmlFor="firstName">Firstname:</label>
            <input type="text" name="firstName" value={firstName} placeholder="John" onChange={this.changeHandler} />
            {firstName.length < 3 ? (<span className="errorMessage">{formError.firstName}</span>) : null}
          </div>

          <div className="lastName">
            <label htmlFor="lastName">Lastname:</label>
            <input type="text" name="lastName" value={lastName} placeholder="Doe" onChange={this.changeHandler} />
            {lastName.length < 3 ? (<span className="errorMessage">{formError.lastName}</span>) : null}
          </div>

          <div className="email">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={email} placeholder="abc@gmail.com" onChange={this.changeHandler} />
            {emailRegex.test(email) && email.length > 0 ? null : (<span className="errorMessage">{formError.email}</span>)}
          </div>

          <div className="password">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={this.changeHandler} placeholder="Password" />
            {password.length < 3 ? (<span className="errorMessage">{formError.password}</span>) : null}
          </div>

          <div className="createAccount">
            <button type="submit">Create Account</button>
            <small>Already Have an Account?</small>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default App;
