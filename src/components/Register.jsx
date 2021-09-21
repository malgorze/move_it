import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { registerUser } from "../api/api";

const Register = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFailure, setRegisterFailure] = useState(false);
  const [body, setBody] = useState({});


  /* Set up useEffect in App.jsx to check for JWT in localstorage and set isLoggedIn.
 Pass isLoggedIn and setIsLoggedIn to Register as props.
 */

  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    const registerResponse = await registerUser(username, password);
    setBody(registerResponse);

    if (registerResponse.message === "you're signed up!") {
      setRegisterSuccess(true);
      setRegisterFailure(false);
      const { token } = registerResponse;
      console.log(registerResponse);
      console.log(token);
      const stringToken = JSON.stringify(token);
      localStorage.setItem("moveItToken", stringToken);
    }      
  };

  return (
    <div className="logins">
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
          <p>{body.message}</p>
        {registerSuccess && <Redirect to="/" />}
      </form>
    </div>
  );
};

export default Register;
