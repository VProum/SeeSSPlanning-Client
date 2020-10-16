import React, { Component } from 'react'
import AddStreamer from "../components/AddStreamer"
import StreamerList from "../components/StreamerList"
import apiHandler from "../api/apiHandler";

export default class EditUser extends Component {
    constructor(props){
        super(props);
        this.addFollow = this.addFollow.bind(this);
    }

    state = {
        streamer_follow : []
    }

    async componentDidMount() {
        const donotmutate = await apiHandler.getUserFollow();
        console.log("EditUser did mount", donotmutate[0]);
        this.setState({
            streamer_follow: [], //to change
        });
      }

    async componentDidUpdate() {
        const donotmutate = await apiHandler.getUserFollow();
    } 

      addFollow(streamer) {
          console.log("addfollow")
          let donotmutate = [...this.state.streamer_follow]
          donotmutate.push(streamer)
          donotmutate = [...new Set(donotmutate)]
          this.setState({
              streamer_follow : donotmutate
          })
      }

    render() {
        return (
            <div className="horizontal">
                <AddStreamer addStreamer={this.addFollow}/>
                <StreamerList userList={this.state.streamer_follow}/>
            </div>
        )
    }
}
