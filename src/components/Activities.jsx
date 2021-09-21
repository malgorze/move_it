import React, { useState, useEffect } from "react";
import { getAllActivities, getAllRoutinesForActivity } from "../api/api";

const Activities = (props) => {
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      const currentActivities = await getAllActivities();
      const listActiveActivities = currentActivities.filter(activity => activity.description);
      setAllActivities(listActiveActivities);
    }
    fetchActivities();
  }, []);

  allActivities.forEach((activity)=>activity.routines = getAllRoutinesForActivity(activity.id));

  
  if (!allActivities) {
    return <div>Loading Activities...</div>;
  }

  return (<div>
    <h1>All Activities</h1>
        {allActivities.map((activity) => (
          <div key={activity.id}>
          <h3>{activity.name}</h3>
          <p><b>Description:</b> {activity.description}</p>
          <p><b>Routines to try with this activity:</b></p>
          </div>))}
  </div>);
};

export default Activities;
