import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome Home !</h1>
      <div>
        <Link to="/activities">
          <button>Activities</button>
        </Link>
        <Link to="/routines">
          <button>Routines</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
