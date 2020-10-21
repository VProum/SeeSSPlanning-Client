import React, { Component } from "react";
import FormEditSchedule from "../components/Forms/FormEditSchedule";
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import "../styles/EditSchedule.css";
import FormDisplayStreamer from "../components/Forms/FormDisplayStreamer";
import apiHandler from "../api/apiHandler";
import FormDisplaySchedule from "../components/Forms/FormDisplaySchedule";
import CircularProgress from '@material-ui/core/CircularProgress';

class EditSchedule extends Component {
  static contextType = UserContext;

  state = {
    hour_day: null,
    duration: 3,
    weekday: "",
    nickname : "",
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
    this.setState({
      schedule_list:[...this.state.schedule_list, schedule] 
    });
  };

  handleDelete = (schedule) => {
    this.setState({
      schedule_list: schedule
    })
  }

  render() {
    const { user } = this.props.context; 
    if (!user) return <CircularProgress />;
    return (
      <div >
        <h1>Schedule your stream</h1>
        <div className="edit-schedule-container" >
          <FormEditSchedule addSchedule={this.handleAdd} />
          {/* schedule_list={this.state.schedule_list} /> */}
          {/* <FormDisplayStreamer /> */}
          <div style={{width:"100vW"}}>
              <FormDisplaySchedule deleteSchedule={this.handleDelete} isdelete schedule_list={this.state.schedule_list} /> 
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(EditSchedule);
