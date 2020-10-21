import React from "react";
import { withUser } from "../Auth/withUser";
import "../../styles/FormDisplaySchedule.css";
import { withStyles } from "@material-ui/core/styles";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    color: "whitesmoke",
    "& > *": {
      margin: theme.spacing(0.5),
      color: "whitesmoke",
    },
  },
});

class FormDisplaySchedule extends React.Component {
  state = {
    schedule_list: this.props.schedule_list,
  };

  handleScheduleFormat = (value) => {
    let formatPlanning = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    value.map((schedule) => {
      for (const prop in formatPlanning) {
        if (prop === schedule.weekday) {
          formatPlanning[prop].push(schedule);
        }
      }
    });

    function compare(a, b) {
      const hour1 = a.hour_day;
      const hour2 = b.hour_day;
      let comparison = 0;
      if (hour1 > hour2) {
        comparison = 1;
      } else if (hour1 < hour2) {
        comparison = -1;
      }
      return comparison;
    }

    for (const prop in formatPlanning) {
      formatPlanning[prop].sort(compare);
    }

    return formatPlanning;
  };

  deleteElement = (value) => {
    apiHandler
      .deleteScheduleOne(value)
      .then((res) => this.props.deleteSchedule(res));
  };

  componentDidMount() {
    this.setState({ schedule_list: this.props.schedule_list });
  }

  render() {
    let scheduleObj = this.handleScheduleFormat(this.props.schedule_list);
    const { user } = this.props.context;

    if (!user) return <CircularProgress />;

    const cardStyle = {
      backgroundColor: this.props.schedule_list.colorBackground
        ? this.props.schedule_list.colorBackground
        : "#342450",
      color: "white",
      display: "flex",
      flexDirection: "column",
      marginRight: "20%",
    };

    return (
      <div
        style={{
          backgroundColor: "#17111e",
          color: "whitesmoke",
        }}
      >
        <h1>Planning week</h1>
        <ul className="form-display-card" >
          {Object.entries(scheduleObj).map(([weekDay, scheduleList], index) => (
            <li key={index} className="form-display-schedule-line-row">
              <div >
                {" "}
                <strong>{weekDay}</strong>{" "}
              </div>
              {scheduleList.map((schedule, i) => (
                <div key={i} className="fliptheCard">
                  <Card.Group className="main-card">
                    <Card
                      style={{
                        backgroundColor: this.props.schedule_list[i].colorBackground
                          ? this.props.schedule_list[i].colorBackground: "#342450",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "20%",
                        width: "150px",
                      }}
                    >
                      <Link to={`/user/planning/${schedule.streamer_id}`}>
                        <Card.Content className="form-display-schedule-content">
                          <Image
                            floated="right"
                            size="mini"
                            src={schedule.avatar}
                            alt="titi"
                          />

                          <Card.Header style={{ color: "whitesmoke" }}>
                            {schedule.hour_day}
                            <br />
                            {schedule.hour_day}
                          </Card.Header>
                          <Card.Meta></Card.Meta>
                          <Card.Description></Card.Description>
                        </Card.Content>
                      </Link>
                      {this.props.isdelete && (
                        <Card.Content extra>
                          <div className="ui two buttons">
                            <Button basic color="blue">
                              <div
                                className="form-display-schedule-container"
                                onClick={() => this.deleteElement(schedule._id)}
                              >
                                Delete
                              </div>
                            </Button>
                          </div>
                        </Card.Content>
                      )}
                    </Card>
                  </Card.Group>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(useStyles)(withUser(FormDisplaySchedule));
