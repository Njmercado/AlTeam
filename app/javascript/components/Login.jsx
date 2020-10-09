import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import * as api from "../helpers/Api";
import UserContext from "../contexts/UserContext";

import "../../assets/stylesheets/login.scss";

const Login = (props) => {
  const [input, setInput] = useState({ userid: "", password: "" });
  const setAuthState = useContext(UserContext).setAuthState;

  const handleChange = (event) => {
    event.persist();
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.login(input.userid, input.password).then((response) => {
      if (response.success) {
        setAuthState({ user: response.user, reported: true });
      }
    });
  };

  return (
    <div className="login-main-container">
      <h1>This is login.</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          name="userid"
          onChange={handleChange}
          value={input.userid}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={input.password}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>

      <button onClick={() => props.history.push("/")}>Go back to home</button>
    </div>
  );
};

export default withRouter(Login);
