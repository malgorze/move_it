import "./App.css";
import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import { Home, Activities, Routines, Login, Register, EditRoutine, AddActivity, EditActivityOnRoutine } from "./components";
// import { userList } from "./api/index";
function App() {
  const logOut = () => {
    localStorage.removeItem("MoveItToken");
    window.location.href = "/";
  };
  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/activities">
          <button>Activities</button>
        </Link>
        <Link to="/routines">
          <button>Routines</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/">
          <button onClick={logOut}>Log Out</button>
        </Link>
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/activities" component={Activities} />
          <Route path="/routines/:routineId/activities" component={AddActivity} />
          <Route path="/routine_activities/edit/:routineActivityId" component={EditActivityOnRoutine} />
          <Route path="/routines/edit/:routineId" component={EditRoutine} />
          <Route path="/routines" component={Routines} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
