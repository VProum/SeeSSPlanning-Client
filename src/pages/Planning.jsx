import React, { Component } from 'react'
import FilterCheckBar from "../components/FilterCheckBar"
import apiHandler from "../api/apiHandler";

export default class Planning extends Component {

    state = {
        followingStreamers : [],
        filterStreamer : [],

    }

    async componentDidMount() {
        const donotmutate = await apiHandler.getUserFollow();
        //console.log("EditUser did mount", donotmutate);
        this.setState({
            followingStreamers: donotmutate, 
        });
    }

    render() {
        return (
            <div>
                <FilterCheckBar streamersList={this.state.followingStreamers}/>
            </div>
        )
    }
}
