import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home, Activities, Routines, Login, Register } from "./components";
// import { userList } from "./api/index";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/activities" component={Activities} />
        <Route path="/routines" component={Routines} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
