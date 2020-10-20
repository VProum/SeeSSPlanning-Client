import React from 'react';
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import CircularProgress from '@material-ui/core/CircularProgress';


 class OneSchedule extends React.Component {
    static contextType = UserContext;
    state = {
        streamerFiltered: [],
    };

    componentDidMount() {
        apiHandler.getUserPlanning(this.props.match.params.id)
        .then(apiRes => {
            this.setState({
                streamerFiltered: apiRes[0],
            });
        }).catch(err => {console.log(err)})
    }

    render() {
        return (
            <div>
                <h1>See planning, next stream?</h1>
                <div>
                  
                        {this.state.streamerFiltered && (
                            <div>
                             <img src={this.state.streamerFiltered.planning_image} alt="pouet"/> 
                            </div>
                        )}

                       

                </div>
            </div>
        )
    }
}

export default OneSchedule;