// API --------------------------------------------------------------

const apiPath = "http://fitnesstrac-kr.herokuapp.com/api/";

// USERS --------------------------------------------------------------

export const registerUser = async (username, password) => {
  const body = {
    username,
    password,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(`${apiPath}users/register`, config);
    const json = await fetchResult.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  const body = {
    username,
    password,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(`${apiPath}users/login`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const fetchResult = await fetch(`${apiPath}users/me`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw (error);
  }
}

export const getUserRoutines = async (username, token = null) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const fetchResult = await fetch(
      `${apiPath}users/${username}/routines`,
      config
    );
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

// ACTIVITIES
// --------------------------------------------------------------

export const getAllActivities = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResult = await fetch(`${apiPath}activities`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const createActivity = async (name, description) => {
  const body = {
    name,
    description,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(`${apiPath}activities`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const updateActivity = async (activityId, name, description) => {
  const body = {
    name,
    description,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(
      `${apiPath}activities/${activityId}`,
      config
    );
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const getAllRoutinesForActivity = async (activityId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResult = await fetch(
      `${apiPath}activities/${activityId}/routines`,
      config
    );
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

// ROUTINES --------------------------------------------------------------

export const getAllPublicRoutines = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResult = await fetch(`${apiPath}routines`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const createRoutine = async (name, goal, isPublic = false, token) => {
  const body = {
    name,
    goal,
    isPublic,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(`${apiPath}routines`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const updateRoutine = async (
  name,
  goal,
  isPublic = false,
  token,
  routineId
) => {
  const body = {
    name,
    goal,
    isPublic,
  };
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(`${apiPath}routines/${routineId}`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const deleteRoutine = async (token, routineId) => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const fetchResult = await fetch(`${apiPath}routines/${routineId}`, config);
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const addActivityToRoutine = async (
  activityId,
  count,
  duration,
  routineId
) => {
  const body = {
    activityId,
    count,
    duration,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(
      `${apiPath}routines/${routineId}/activities`,
      config
    );
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

// ROUTINE_ACTIVITIES --------------------------------------------------------------

export const updateRoutineActivity = async (
  count,
  duration,
  token,
  routineActivityId
) => {
  const body = {
    count,
    duration,
  };
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  try {
    const fetchResult = await fetch(
      `${apiPath}routine_activities/${routineActivityId}`,
      config
    );
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const deleteRoutineActivity = async (token, routineActivityId) => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const fetchResult = await fetch(
      `${apiPath}routine_activities/${routineActivityId}`,
      config
    );
    const json = await fetchResult.json();
    return json;
  } catch (error) {
    throw error;
  }
};
