import React from "react";
import Hooks from "../components/Hooks"
import apiHandler from "../api/apiHandler";
import StreamerList from "../components/StreamerList";


class Home extends React.Component {

state = {
  allStreamers : []
}

async componentDidMount() {
  const donotmutate = await apiHandler.getStreamer();
  //console.log("addstreamer did mount");
  this.setState({
    allStreamers: donotmutate,
  });
}

  render() {
    return (
      <div>
        <h1>Home Page ∆</h1>
        <StreamerList userList={this.state.allStreamers} />
        
      </div>
    );
  }
}

export default Home;
