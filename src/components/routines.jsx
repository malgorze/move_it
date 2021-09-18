
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
    )
}


export default Routines;
