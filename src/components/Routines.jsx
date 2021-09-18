
import React, { useState, useEffect } from 'react';
import { getAllPublicRoutines } from '../api/api';

const Routines = (props) => {
    const [allRoutines, setAllRoutines] = useState([]);
    const [token, updateToken] = useState(null);

    useEffect(() => {
        async function fetchRoutines() {
            const localToken =
            JSON.parse(localStorage.getItem("MoveItToken")) ?? null;

            updateToken(localToken);
            const currentRoutines = await getAllPublicRoutines(localToken);
            setAllRoutines(currentRoutines);
        }
        fetchRoutines();
    }, []);
    
    if (!allRoutines) {
        return (
           <h1>Loading Routines...</h1>
        );
    };

    return (
        /* Need to map over allRoutines array to generate cards for each routine.
        Then decide how to integrate functionality for myRoutines to be able to create,
        edit, and delete routines.
        */
        <div>
            {
                allRoutines.map(routine => (
                    <div key={routine.id}>
                        <h3>Routine Name: {routine.name}</h3>
                        <p>Goal: {routine.goal}</p>
                        <p>Created By: {routine.creatorName}</p>
                        {routine.activities[0] && <h5>Activities</h5>}
                        {routine.activities && routine.activities.map(activity => (
                        <>
                            <ul>{activity.name}</ul>
                            <li>Description: {activity.description}</li>
                            <li>Duration: {activity.duration} minutes</li>
                            <li>Count: {activity.count} reps</li>
                        </>
                        ))}
                    </div>
                )
                )
            }
        </div>

    )
}


export default Routines;
