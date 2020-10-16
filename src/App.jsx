import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import apiHandler from "../src/api/apiHandler";
import EditUser from "./pages/EditUser"
import EditSchedule from "./pages/EditSchedule";

class App extends React.Component {

   render() {
    console.log(process.env);
    return (
      <div className="App">
        <NavMain />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/user/edit" component={EditUser} />
          <Route path="/schedule/edit" component={EditSchedule} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
