import React from "react";

const AllRoutines = ({allRoutines}) => (
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
);

export default AllRoutines;