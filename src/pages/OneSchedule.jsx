import React from "react";
import { withUser } from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../styles/OnSchedule.css";
import StreamerList from "../components/StreamerList";
import { makeStyles } from "@material-ui/core/styles";
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
        <h1 style={{textAlign: "center", color:"whitesmoke", marginBottom: "2%"}}>{this.state.streamerFiltered.nickname}'s schedule </h1>
        <div className="one-schedule-main-container">
          <div className="one-schedule-user-card">
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
                {this.state.streamerFiltered.nb_followers} followers
                twitch.tv/nickname
              </Card.Content>
            </Card>
          </div>

          <div className="one-schedule-wall-card">
            {this.state.streamerFiltered && (
              <div>
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
