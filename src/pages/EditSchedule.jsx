import React, { Component } from "react";
import FormEditSchedule from "../components/Forms/FormEditSchedule";
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import "../styles/EditSchedule.css";
import FormDisplayStreamer from "../components/Forms/FormDisplayStreamer";

class EditSchedule extends Component {
  static contextType = UserContext;

  state = {
    hour_day: null,
    duration: 3,
    weekday: "",
  };

  handleAdd = (schedule) => {
    for (let key in schedule) {
      this.setState({
        [key]: schedule[key],
      });
    }
  };


  render() {
    const { user } = this.props.context;

    if (!user) return <div>Loading...</div>;
    
    return (
      <div>
        <h1>Schedule your stream</h1>
        <div className="edit-schedule-container">
          <FormEditSchedule addSchedule={this.handleAdd} />
          <FormDisplayStreamer />
        </div>
      </div>
    );
  }
}

export default withUser(EditSchedule);
