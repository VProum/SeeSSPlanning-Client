import React, { Component } from 'react'
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import CircularProgress from '@material-ui/core/CircularProgress';
import "../styles/StreamerList.css";
import "../styles/streamerDetail.css";




class StreamerDetail extends Component {
    static contextType = UserContext;
    render() {
        const { user } = this.props.context;
        //console.log("context", user);
        if (!user || user.length === 0) return <CircularProgress />;
        return (
            <div className="streamer-detail">
                {/* <img src={user[0].avatar} alt="blur"/> */}
                <h1>Welcome {user[0].nickname}!</h1>
                <p>Here is all the streamers you are currently monitoring : </p>         
            </div>
        )
    }
}

export default withUser(StreamerDetail)
