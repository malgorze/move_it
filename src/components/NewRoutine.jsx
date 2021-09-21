import React, { useState, useEffect } from "react";
import { createRoutine } from "../api/api";

const NewRoutine = () => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [goal, setGoal] = useState(null);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("MoveItToken")) ?? null;
    setToken(localToken);
    console.log(token);
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const createdRoutine = await createRoutine(name, goal, isPublic, token);
      console.log(createdRoutine);
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
          event.preventDefault();
          setIsPublic(event.target.value);
        }}
      />
      <button type="submit">Create Routine</button>
    </form>
  );
};

export default NewRoutine;
