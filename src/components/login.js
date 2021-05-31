import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [display, setDisplay] = useState(false);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    }).catch((err) => {});
    console.log("handleSubmit token: " + token);
    setDisplay(false);

    if (token !== undefined) {
      setToken(token);
      history.push("/dashboard");
    } else {
      setDisplay(true);
    }
  };

  let showWarning = {};
  if (!display) {
    showWarning.display = "none";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div className="warning" style={showWarning}>
        <p style={{ color: "red" }}>
          The username and password do not match. Please try again!
        </p>
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
      <p className="forgot-password text-right">
        <a href="#">Forgot password?</a>
      </p>
    </form>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
