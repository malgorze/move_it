import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { createRoutine } from "../api/api";

const NewRoutine = () => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [goal, setGoal] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [newRoutine, setNewRoutine] = useState();

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("moveItToken")) ?? null;
    setToken(localToken);
    console.log(token);
  }, []);

/*  After creating newRoutine, page doesn't render new routine,
    probably since the route is the same. Should create different
    route for newRoutine form and perhaps a link to take you there.
*/
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const createdRoutine = await createRoutine(name, goal, isPublic, token);
      setNewRoutine(createdRoutine);
      console.log(newRoutine);
      if (createdRoutine) {
        setAddSuccess(true);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        Routine Name:
        <input
          type="text"
          onChange={(event) => {
            event.preventDefault();
            setName(event.target.value);
          }}
        />
      </label>
      <label>Goal:</label>
      <input
        type="text"
        onChange={(event) => {
          event.preventDefault();
          setGoal(event.target.value);
        }}
      />
      <label>Make Public:</label>
      <input
        type="checkbox"
        onChange={(event) => {
          setIsPublic(event.target.value);
        }}
      />
      <button type="submit">Create Routine</button>
      {addSuccess && <Redirect to="/routines" />}
    </form>
  );
};

export default NewRoutine;
