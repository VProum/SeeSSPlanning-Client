import React from "react";
import { withUser } from "../Auth/withUser";
import "../../styles/FormDisplaySchedule.css";
import { withStyles } from "@material-ui/core/styles";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
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
    return (
      <div style={{ marginTop: "7%" }}>
        <h1>Planning week</h1>
        <ul>
          {Object.entries(scheduleObj).map(([weekDay, scheduleList], index) => (
            <li key={index} className="form-display-schedule-line-row">
              <div style={{ width: "12vw" }}>
                {" "}
                <strong>{weekDay}</strong>{" "}
              </div>
              {scheduleList.map((schedule, i) => (
                <div key={i}>
                  <Card.Group>
                    <Card>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                        />
                        <Card.Header>{schedule.hour_day}</Card.Header>
                        <Card.Meta>duration: {schedule.duration}h:00</Card.Meta>
                        <Card.Description>
                          {schedule.streamer_name.toString()}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button basic color="green">
                            <Link to={`/schedule/view/${schedule._id}`}>
                              GO to planning
                            </Link>
                          </Button>
                            {this.props.isdelete && (
                          <Button basic color="red">
                              <div
                                className="form-display-schedule-container"
                                onClick={() => this.deleteElement(schedule._id)}
                              >
                                Delete
                              </div>
                          </Button>
                            )}
                        </div>
                      </Card.Content>
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
