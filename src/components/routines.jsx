import React, { useState, useEffect } from "react";
import { getAllPublicRoutines, getUserRoutines, getUserData } from "../api/api";

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

      if (token) {
        const currentUserData = await getUserData(token);
        setUserData(currentUserData);

        const currentUserRoutines = await getUserRoutines(
          currentUserData.username,
          token
        );
        setUserRoutines(currentUserRoutines);
      }
    }
    fetchRoutines();
  }, []);

  if (!allRoutines) {
    return <h1>Loading Routines...</h1>;
  }

  return (
    /* Need to map over allRoutines array to generate cards for each routine.
        Then decide how to integrate functionality for myRoutines to be able to create,
        edit, and delete routines.
        */
    <div>
      {/* div for all public routines, mapping routine and activity data */}
      <div>
        <h1>All Routines</h1>
        {allRoutines.map((routine) => (
          <div key={routine.id}>
            <h3>{routine.name}</h3>
            <p>Goal: {routine.goal}</p>
            <p>Created By: {routine.creatorName}</p>
            {routine.activities[0] && <h5>Activities</h5>}
            {routine.activities &&
              routine.activities.map((activity) => (
                <>
                  <ul>{activity.name}</ul>
                  <li>Description: {activity.description}</li>
                  <li>
                    Duration: {activity.duration}{" "}
                    {activity.duration === 1 ? "minute" : "minutes"}
                  </li>
                  <li>
                    Count: {activity.count}{" "}
                    {activity.count === 1 ? "rep" : "reps"}
                  </li>
                </>
              ))}
          </div>
        ))}
      </div>
      {/* div for all of the logged-in user's routines */}
      {/* <div>
        {userData && <h1>{userData.username}'s Routines</h1>}
        {userData &&
          userRoutines.map((routine) => (
            <div key={routine.id}>
              <h3>{routine.name}</h3>
              <p>Goal: {routine.goal}</p>
              {routine.activities[0] && <h5>Activities</h5>}
              {routine.activities &&
                routine.activities.map((activity) => (
                  <>
                    <ul>{activity.name}</ul>
                    <li>Description: {activity.description}</li>
                    <li>
                      Duration: {activity.duration}{" "}
                      {activity.duration === 1 ? "minute" : "minutes"}
                    </li>
                    <li>
                      Count: {activity.count}{" "}
                      {activity.count === 1 ? "rep" : "reps"}
                    </li>
                  </>
                ))}
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default Routines;
