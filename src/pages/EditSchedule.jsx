import React, { Component } from "react";
import FormEditSchedule from "../components/Forms/FormEditSchedule";
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import "../styles/EditSchedule.css";
import FormDisplayStreamer from "../components/Forms/FormDisplayStreamer";
import apiHandler from "../api/apiHandler";
import FormDisplaySchedule from "../components/Forms/FormDisplaySchedule";

class EditSchedule extends Component {
  static contextType = UserContext;

  state = {
    hour_day: null,
    duration: 3,
    weekday: "",
    schedule_list: [],
  };

  componentDidMount() {
    apiHandler.getSchedule().then((dbRes) => {
      this.setState({
        schedule_list: dbRes,
      });
    });
  }

  handleAdd = (schedule) => {
    for (let key in schedule) {
      this.setState({
        [key]: schedule[key],
      });
    }
  };

  render() {
    const { user } = this.props.context;
    //  console.log(this.state)

    if (!user) return <div>Loading...</div>;

    return (
      <div>
        <h1>Schedule your stream</h1>
        <div className="edit-schedule-container">
          <FormEditSchedule addSchedule={this.handleAdd} />
          <FormDisplayStreamer />
          <div style={{width:"70vW"}}>
            <FormDisplaySchedule schedule_list={this.state.schedule_list} />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(EditSchedule);
