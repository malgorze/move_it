import "./App.css";
import { Switch, Route } from "react-router-dom";
import { home, activities, routines } from "./components";
// import { userList } from "./api/index";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={home} />
        <Route path="/activities" component={activities} />
        <Route path="/routines" component={routines} />
      </Switch>
    </div>
  );
}

export default App;
