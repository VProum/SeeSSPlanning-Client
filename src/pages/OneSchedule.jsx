import React from 'react';
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import CircularProgress from '@material-ui/core/CircularProgress';


 class OneSchedule extends React.Component {
    static contextType = UserContext;
    state = {
        streamerFiltered: [],
    };

    componentDidMount(props) {
        apiHandler.getDetailSchedule(this.props.match.params.id)
        .then(apiRes => {
            this.setState({
                streamerFiltered: apiRes,
            });
        })
    }

    render() {
        const { user } = this.props.context;
    
    if (!user) return <CircularProgress />;
        return (
            <div>
                <h1>See planning, next stream?</h1>
                <div>
                    {this.state.streamerFiltered.length > 0 && (
                        <img src={this.state.streamerFiltered[0].planning_image} alt=""/>
                    )}
                </div>
            </div>
        )
    }
}

export default withUser(OneSchedule);