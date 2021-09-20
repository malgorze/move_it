import React from "react";
import { Link } from "react-router-dom";

const UserRoutines = ({userData, userRoutines}) => (
<div>
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
                <Link to={{
                    pathname: `/routines/edit/${routine.id}`
                }}>Edit/Delete Routine</Link>
            </div>
          ))}
      </div>
);

export default UserRoutines;