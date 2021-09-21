import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { addActivityToRoutine, getAllActivities } from "../api/api";

const AddActivity = ({ match }) => {
  const routineId = match.params.routineId;
  const [allActivities, setAllActivities] = useState([]);
  const [activityCount, setActivityCount] = useState();
  const [activityDuration, setActivityDuration] = useState();
  const [activityId, setActivityId] = useState();
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const activities = await getAllActivities();
      setAllActivities(activities);
    }

    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const addedActivity = await addActivityToRoutine(
        activityId,
        activityCount,
        activityDuration,
        routineId
      );
      if (addedActivity) {
        setAddSuccess(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const dropdownHandler = () => {
    const selectedValue = document.getElementById("activities").value;
    setActivityId(selectedValue);
  };

  if (!allActivities) {
    return "Loading...";
  }

  return (
    <form onSubmit={submitHandler}>
      <label>
        Activity:
        <select id="activities" onChange={dropdownHandler}>
          {allActivities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </label>
      <label>Count:</label>
      <input
        type="number"
        min="1"
        onChange={(event) => {
          event.preventDefault();
          setActivityCount(event.target.value);
        }}
      />
      <label>Duration:</label>
      <input
        type="number"
        min="1"
        onChange={(event) => {
          event.preventDefault();
          setActivityDuration(event.target.value);
        }}
      />
      <button type="submit">Add Activity to Routine</button>
      {addSuccess && <Redirect to="/routines" />}
    </form>
  );
};

export default AddActivity;
