import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const loginTest = 'Login';
  const nameTest = 'login';
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    dispatch(authenticate({ username, password, method: formName }));
    window.localStorage.removeItem('bookmark');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={nameTest} className="login-form">
        <div className="group">
          <input
            name="username"
            type="text"
            className={error !== null ? 'highlights' : null}
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Userame</label>
        </div>
        <div className="group">
          <input
            name="password"
            type="password"
            className={error !== null ? 'highlights' : null}
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>Password</label>
        </div>
        <button
          id="productContainerssss"
          type="submit"
          className="submit-button">
          {loginTest}
        </button>
        {error !== null && (
          <div className="error-message"> The User/Password is incorrect </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
