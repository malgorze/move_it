import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useHistory } from "react-router";

// Should we put Register and Login together?

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);

  let history = useHistory();

  /* Set up useEffect in App.jsx to check for JWT in localstorage and set isLoggedIn.
 Pass isLoggedIn and setIsLoggedIn to Login as props.
 */

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const loginResult = await loginUser(username, password);
    if (loginResult.success) {
      setLoginSuccess(true);
      setLoginFailure(false);
      // setIsLoggedIn(true);
      const {
        data: { token },
      } = loginResult;
      const stringToken = JSON.stringify(token);
      if (token) {
        localStorage.setItem("MoveItToken", stringToken);
        history.push("/home");
        window.location.href = "/home";
        // setIsLoggedIn(true);
        // Any other actions once user is logged in?
      }
    } else {
      setLoginSuccess(false);
      setLoginFailure(true);
    }
  };

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
        {loginFailure && (
          <p style={{ color: "red" }}>
            Incorrect username/password. Please try again.
          </p>
        )}
        {loginSuccess && <p>Welcome back {username}!</p>}
      </form>
    </div>
  );
};

export default Login;
