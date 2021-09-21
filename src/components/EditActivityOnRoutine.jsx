import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { updateRoutineActivity, deleteRoutineActivity } from "../api/api";

const EditActivityOnRoutine = ({ match }) => {
  const currentRoutineActivityId = match.params.routineActivityId;
  const [token, setToken] = useState(null);
  const [routineActivityCount, setRoutineActivityCount] = useState();
  const [routineActivityDuration, setRoutineActivityDuration] = useState();
  const [editSuccess, setEditSuccess] = useState();

  useEffect(() => {
    async function fetchData() {
      const localToken =
        JSON.parse(localStorage.getItem("MoveItToken")) ?? null;
      setToken(localToken);
    }
    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!token) {
      return <Redirect to="/routines" />;
    }
    try {
      const addedActivity = await updateRoutineActivity(
        routineActivityCount,
        routineActivityDuration,
        token,
        currentRoutineActivityId
      );
      if (addedActivity) {
        setEditSuccess(true);
      }
      console.log(addedActivity);
    } catch (error) {
      throw error;
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
    try {
      const deletedRoutineActivity = await deleteRoutineActivity(
        token,
        currentRoutineActivityId
      );
      if (deletedRoutineActivity) {
        setEditSuccess(true);
      }
      console.log(deletedRoutineActivity);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>Count:</label>
        <input
          type="number"
          min="1"
          onChange={(event) => {
            event.preventDefault();
            setRoutineActivityCount(event.target.value);
          }}
        />
        <label>Duration:</label>
        <input
          type="number"
          min="1"
          onChange={(event) => {
            event.preventDefault();
            setRoutineActivityDuration(event.target.value);
          }}
        />
        <button type="submit">Edit Activity</button>
        {editSuccess && <Redirect to="/routines" />}
      </form>
      <form onSubmit={deleteHandler}>
        <button type="submit">Delete Activity</button>
        {editSuccess && <Redirect to="/routines" />}
      </form>
    </>
  );
};

export default EditActivityOnRoutine;
