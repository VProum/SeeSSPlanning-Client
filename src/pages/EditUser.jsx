import React, { Component } from "react";
import AddStreamer from "../components/AddStreamer";

import apiHandler from "../api/apiHandler";


export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.addFollow = this.addFollow.bind(this);
    this.removeFollow = this.removeFollow.bind(this);
  }

  state = {
    streamer_follow: [],
  };

  async componentDidMount() {
    const donotmutate = await apiHandler.getUserFollow();
    //console.log("EditUser did mount", donotmutate);
    this.setState({
      streamer_follow: donotmutate, //to change
    });
  }

  async componentDidUpdate() {
    //const donotmutate = await apiHandler.getUserFollow();
    // console.log("EditUser did mount", donotmutate);
    // this.setState({
    //   streamer_follow: donotmutate, //to change
    // });
  }

  addFollow(streamer) {
    //console.log("addfollow", streamer);
    let donotmutate = [...this.state.streamer_follow];
    donotmutate.push(streamer);
    //donotmutate = [...new Set(donotmutate)]
    this.setState({
      streamer_follow: donotmutate,
    });
  }

  async removeFollow(index) {
    //console.log("removefollow", index);
    let donotmutate = [...this.state.streamer_follow];
    //console.log("removefollow2", donotmutate[index]);
    await apiHandler.removeFollowStreamer(donotmutate[index]._id); //remove from db
    donotmutate.splice(index, 1); //remove from state
    //console.log("edit user state",donotmutate)
    //donotmutate = [...new Set(donotmutate)]
    this.setState({
      streamer_follow: donotmutate,
    });
  }

  render() {
    //console.log("edit user state",this.state)
    return (
    <>
        <AddStreamer
          addStreamer={this.addFollow}
          userList={this.state.streamer_follow}
          removeFollow={this.removeFollow}
        />
 
          {/* <StreamerList
            userList={this.state.streamer_follow}
            removeStreamer={this.removeFollow}
            isDelete
          /> */}
          
        </>
    );
  }
}
