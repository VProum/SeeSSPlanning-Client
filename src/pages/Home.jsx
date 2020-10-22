import React from "react";
import Hooks from "../components/Hooks"
import apiHandler from "../api/apiHandler";
import StreamerList from "../components/StreamerList";
import "./../styles/home.css"



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
      <div className="homepage">
        <h1>Welcome to CSS-Planning!</h1>
        <section>
          This webpage allows you to see the planning of different streamer in one simple page!
        </section>
        <StreamerList userList={this.state.allStreamers} />
      </div>
    );
  }
}

export default Home;
