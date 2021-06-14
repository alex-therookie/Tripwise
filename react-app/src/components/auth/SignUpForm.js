import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp, login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-form-container">
      <h1>Sign Up</h1>
      <form onSubmit={onSignUp}>
        <div className="form-input-container">
          <div>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <br />
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Confirm Password</label>
            <br />
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type="submit" className="btn signup-btn">
            Sign Up
          </button>
        </div>
      </form>
      <button onClick={demoLogin} className="btn signup-btn demo-login">
        Demo user
      </button>
    </div>
  );
};

export default SignUpForm;
