import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { loginUser } from "../api/api";
// import { useHistory } from "react-router";

// Should we put Register and Login together?

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);
  const [body, setBody] = useState({});

  /* Set up useEffect in App.jsx to check for JWT in localstorage and set isLoggedIn.
 Pass isLoggedIn and setIsLoggedIn to Login as props.
 */

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const loginResult = await loginUser(username, password);
    setBody(loginResult);
    console.log(loginResult);
    if (loginResult.message === "you're logged in!") {
      setLoginSuccess(true);
      setLoginFailure(false);
      const { token } = loginResult;
      const stringToken = JSON.stringify(token);
      if (token) {
        localStorage.setItem("MoveItToken", stringToken);
        history.push("/home");
        window.location.href = "/home";
        // setIsLoggedIn(true);
        // Any other actions once user is logged in?
        localStorage.setItem("MoveItToken", stringToken);
      } else {
        setLoginSuccess(false);
        setLoginFailure(true);
      }
    }

    return (
      <div className="logins">
        <h2>Log in here:</h2>
        <form onSubmit={loginSubmitHandler}>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => {
              event.preventDefault();
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              event.preventDefault();
              setPassword(event.target.value);
            }}
          />
          <button type="submit">Login</button>
          <p>{body.message}</p>
          {loginSuccess && <p>Welcome back ${username}!</p>}
        </form>
      </div>
    );
  };
};

export default Login;
