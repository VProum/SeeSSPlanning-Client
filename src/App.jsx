import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import apiHandler from "../src/api/apiHandler";


function App() {


function handlePouet() {
  apiHandler.testPouet();
  
}


  return (
    <div className="App">

    <button onClick={handlePouet}>Test Twitch</button>

      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
