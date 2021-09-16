import React, { useState } from "react";
import { registerUser } from "../api/api";

const Register = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFailure, setRegisterFailure] = useState(false);

  /* Set up useEffect in App.jsx to check for JWT in localstorage and set isLoggedIn.
 Pass isLoggedIn and setIsLoggedIn to Register as props.
 */

  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    const registerResponse = await registerUser(username, password);

    if (registerResponse.success) {
      setRegisterSuccess(true);
      setRegisterFailure(false);
      setIsLoggedIn(true); /*FROM PROPS*/
      const {
        data: { token },
      } = registerResponse;
      const stringToken = JSON.stringify(token);
      localStorage.setItem("moveItToken", stringToken);
    } else {
      setRegisterSuccess(false);
      setRegisterFailure(true);
    }
  };

  return (
    <div>
      <h2>Sign up here!</h2>
      <form onSubmit={registerSubmitHandler}>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(event) => {
            event.preventDefault();
            setUsername(event.target.value);
          }}
          minLength="6"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(event) => {
            event.preventDefault();
            setPassword(event.target.value);
          }}
          minLength="8"
          required
        />
        <button type="submit">Register</button>
        {registerFailure && (
          /*On failure, do abc. On success, do xyz*/
          <p>Sorry, but that username already exists. Please try again.</p>
        )}
        {registerSuccess && <p>Welcome to Move It!</p>}
      </form>
    </div>
  );
};

export default Register;
