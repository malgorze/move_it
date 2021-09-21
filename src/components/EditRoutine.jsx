import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  deleteRoutine,
  getUserData,
  getUserRoutines,
  updateRoutine,
} from "../api/api";

const EditRoutine = ({ match }) => {
  const currentRoutineId = match.params.routineId;
  const [token, setToken] = useState(null);
  const [userRoutines, setUserRoutines] = useState([]);
  const [userData, setUserData] = useState();
  const [currentRoutine, setCurrentRoutine] = useState();
  const [routineName, setRoutineName] = useState();
  const [routineGoal, setRoutineGoal] = useState();
  const [routineActivities, setRoutineActivities] = useState([]);
  const [routineIsPublic, setRoutineIsPublic] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const localToken =
        JSON.parse(localStorage.getItem("moveItToken")) ?? null;
      setToken(localToken);
      try {
        if (localToken) {
          const currentUserData = await getUserData(localToken);
          setUserData(currentUserData);

          const currentUserRoutines = await getUserRoutines(
            currentUserData.username,
            localToken
          );
          setUserRoutines(currentUserRoutines);

          console.log(currentUserRoutines);

          const routineToEdit = currentUserRoutines.filter(
            (routine) => routine.id === currentRoutineId
          );
          //  should have to set routineToEdit equal to ...[0]. currentUserRoutines logs an
          // array of routine objects, but routineToEdit is undefined, triggering an error with the destructuring.

          setCurrentRoutine(routineToEdit);

          const { name, goal, activities, isPublic } = routineToEdit;
          setRoutineName(name);
          setRoutineGoal(goal);
          setRoutineActivities(activities);
          setRoutineIsPublic(isPublic);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!userData) {
        return <Redirect to="/routines" />;
      }
      const updatedRoutine = await updateRoutine(
        routineName,
        routineGoal,
        routineIsPublic,
        token,
        currentRoutineId
      );
      console.log(updatedRoutine);
      setUpdateSuccess(true);
    } catch (error) {
      throw error;
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
    try {
      if (!userData) {
        return <Redirect to="/routines" />;
      }
      const deletedRoutine = await deleteRoutine(token, currentRoutineId);
      console.log(deletedRoutine);
      setUpdateSuccess(true);
    } catch (error) {
      throw error;
    }
  };

  if (!currentRoutine) {
    return "Loading Form";
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Routine Name:
          <input
            type="text"
            defaultValue={currentRoutine.name}
            onChange={(event) => {
              event.preventDefault();
              setRoutineName(event.target.value);
            }}
          />
        </label>
        <label>Goal:</label>
        <input
          type="text"
          defaultValue={currentRoutine.goal}
          onChange={(event) => {
            event.preventDefault();
            setRoutineGoal(event.target.value);
          }}
        />
        <label>Make Public:</label>
        <input
          type="checkbox"
          onChange={(event) => {
            setRoutineIsPublic(event.target.value);
          }}
        />
        <button type="submit">Update Routine</button>
        {updateSuccess && <Redirect to="/routines" />}
      </form>
      <button type="button" onClick={deleteHandler}>
        Delete Routine
      </button>
      {updateSuccess && <Redirect to="/routines" />}
    </div>
  );
};

export default EditRoutine;
