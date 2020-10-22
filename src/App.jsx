import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import EditUser from "./pages/EditUser";
import EditSchedule from "./pages/EditSchedule";
import Planning from "./pages/Planning";
import OneSchedule from "./pages/OneSchedule";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
  }

  state = {
    input: [],
    konamicode: false,
  };

  arraysMatch(arr1, arr2) {

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;
  
    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
  
    // Otherwise, return true
    return true;
  
  };

  handleKey(event) {
    console.log(event.keyCode);
    let donotmutate = [...this.state.input];

    if (this.state.input.length >= 10) {
      donotmutate.shift();
    }
    donotmutate.push(event.keyCode);

    //check konamicode
    let bool = this.arraysMatch(donotmutate, [38,38,40,40,37,39,37,39,65,66]);
    this.setState({
      input: donotmutate,
      konamicode: bool
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey, false);
  }

  render() {
    if(this.state.konamicode === true){
      this.setState({
        konamicode: false
      });
      window.open("https://www.google.com", "_blank")
    }
    console.log("this is V1.0");
    return (
      <div className="App">
        <NavMain />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/planning" component={Planning} />
          <Route exact path="/user/edit" component={EditUser} />
          <Route path="/user/planning/:id" component={OneSchedule} />
          <Route path="/schedule/edit" component={EditSchedule} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
