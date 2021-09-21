import React from "react";

const Home = () => {
  const localToken = JSON.parse(localStorage.getItem("moveItToken"));
  
  return (
    <div>
      <h1>Welcome Home !</h1>
      <div></div>
    </div>
  );
};

export default Home;
