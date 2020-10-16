import React, { Component } from 'react'
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";



class StreamerDetail extends Component {
    static contextType = UserContext;
    render() {
        const { user } = this.props.context;
        if (!user) return <div>Loading...</div>;
        console.log("context", user);
        return (
            <div className="horizontal">
                <img src={user[0].avatar} alt="blur"/>
                <h1>{user[0].nickname}</h1>         
            </div>
        )
    }
}

export default withUser(StreamerDetail)
