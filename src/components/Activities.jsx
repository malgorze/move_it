import React, { useState, useEffect } from "react";
import { getAllActivities, getAllRoutinesForActivity } from "../api/api";

const Activities = (props) => {
  const [allActivities, setAllActivities] = useState([]);
  const [allRoutinesforActivity, setAllRoutinesforActivity] = useState([]);
  const [ActivityId, setActivityId] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      const currentActivities = await getAllActivities();
      setAllActivities(currentActivities);
    }
    fetchActivities();
  }, []);

  useEffect(() => {
    async function fetchRoutinesforActivity() {
      const currentRoutinesforActivity = await getAllRoutinesForActivity(
        ActivityId
      );
      setAllRoutinesforActivity(currentRoutinesforActivity);
    }
    fetchRoutinesforActivity();
  }, [ActivityId]);

  if (!allActivities) {
    return <div>Loading Activities...</div>;
  }

  if (!allRoutinesforActivity) {
    return <div>Loading All Routines for this Activity and more</div>;
  }

  return <div></div>;
};

export default Activities;
