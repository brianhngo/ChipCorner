import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const loginTest = 'Login'
  const nameTest = 'login'
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
   
    dispatch(authenticate({ username, password, method: formName }));
  
  };

  return (
    <div>
  <form onSubmit={handleSubmit} name={nameTest} className="login-form">
    <div className="form-group">
      <label htmlFor="username" className="form-label">
        <h2>Username</h2>
      </label>
      <input name="username" type="text" className="form-input" />
    </div>
    <div className="form-group">
      <label htmlFor="password" className="form-label">
        <h2>Password</h2>
      </label>
      <input name="password" type="password" className="form-input" />
    </div>
    <button id="productContainerssss" type="submit" className="submit-button">
      {loginTest}
    </button>
    {error && <div className="error-message"> {JSON.stringify(error)} </div>}
  </form>
</div>
  );
};

export default AuthForm;
