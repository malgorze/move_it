import React, { useState, useEffect } from "react";
import { getAllPublicRoutines, getUserRoutines, getUserData } from "../api/api";
import AllRoutines from "./AllRoutines";
import NewRoutine from "./NewRoutine";
import UserRoutines from "./UserRoutines";

const Routines = (props) => {
  const [allRoutines, setAllRoutines] = useState([]);
  const [userRoutines, setUserRoutines] = useState([]);
  const [userData, setUserData] = useState();
  const [token, updateToken] = useState({});


  useEffect(() => {
    async function fetchRoutines() {
      
      const localToken =
        JSON.parse(localStorage.getItem("MoveItToken")) ?? null;

      updateToken(localToken);

      const currentRoutines = await getAllPublicRoutines();
      setAllRoutines(currentRoutines);

      if (localToken) {
        const currentUserData = await getUserData(localToken);
        setUserData(currentUserData);

        const currentUserRoutines = await getUserRoutines(
          currentUserData.username,
          localToken
        );
        console.log(localToken);
        setUserRoutines(currentUserRoutines);
      }
    }
    fetchRoutines();
  }, []);

  if (!allRoutines || !userRoutines) {
    return <h1>Loading Routines...</h1>;
  }

  return (
    /* Need to map over allRoutines array to generate cards for each routine.
        Then decide how to integrate functionality for myRoutines to be able to create,
        edit, and delete routines.
        */
    <div>
      {token && <NewRoutine />}
      <AllRoutines allRoutines={allRoutines}/>
      {/* div for all of the logged-in user's routines */}
      <UserRoutines userData={userData} userRoutines={userRoutines}/>
    </div>
  );
};

export default Routines;
