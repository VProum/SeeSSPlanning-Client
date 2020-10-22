import React from "react";
import { withUser } from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import "../styles/OnSchedule.css";
import { Card, Icon, Image } from "semantic-ui-react";

import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({});

class OneSchedule extends React.Component {
  static contextType = UserContext;
  state = {
    streamerFiltered: [],
  };

  componentDidMount() {
    apiHandler
      .getUserPlanning(this.props.match.params.id)
      .then((apiRes) => {
        this.setState({
          streamerFiltered: apiRes[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    return (
      <div className="one-schedule-global">
        <h1 style={{fontSize:"3em", textAlign: "center", color:"whitesmoke", marginBottom: "2%",textShadow: "1px 1px 2px black, 0 0 25px white"}}>{this.state.streamerFiltered.nickname}'s schedule </h1>
        <div className="one-schedule-main-container">
          <div className="one-schedule-user-card">
             <Link to={{ pathname: `https://www.twitch.tv/${this.state.streamerFiltered.nickname}` }} target="_blank" >
            <Card color="teal" style={{ height: "250px", width: "175px" }}>
            
              <Image
                src={this.state.streamerFiltered.avatar}
                wrapped
                ui={false}
                alt="blurry"
              />
              <Card.Content style={{ background: "#e6ddf0" }}>
                <Card.Header>
                  {this.state.streamerFiltered.nickname}
                </Card.Header>
                <Card.Meta>
                  {this.state.streamerFiltered.streamer_type}
                </Card.Meta>
                <Icon name="users" />
                {this.state.streamerFiltered.nb_followers}
              </Card.Content>
            </Card>
             </Link>
          </div>

          <div className="one-schedule-wall-card">
            {this.state.streamerFiltered && (
              <div className="one-schedule-img-container">
                <img
                  src={this.state.streamerFiltered.planning_image}
                  alt={this.state.streamerFiltered.nickname}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(withUser(OneSchedule));
