import React, { Component } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import apiHandler from "../api/apiHandler";
import StreamerDetail from "../components/StreamerDetail";
import StreamerList from "../components/StreamerList";

import {
  Grid,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     overflow: "hidden",
//     backgroundColor: theme.palette.background.paper,
//   },
//   "& .MuiGridList-root": {
//     width: "30%",
//   },
// }));



export default class AddStreamer extends Component {
  constructor(props) {
    super(props);

    this.ClickHandler = this.ClickHandler.bind(this);
  }

  state = {
    filterValue: "",
    streamer_list: [],
  };

  async componentDidMount() {
    const donotmutate = await apiHandler.getStreamer();
    //console.log("addstreamer did mount");
    this.setState({
      streamer_list: donotmutate,
    });
  }

  async ClickHandler(event) {
    let indispensable = this.state.streamer_list[event.currentTarget.id];
    //console.log("indispensable", indispensable)
    if (this.props.userList.filter(function(item){ return item._id === indispensable._id }).length === 0) {
      await apiHandler.addFollowStreamer(indispensable._id);
      this.props.addStreamer(indispensable);
    }
  }



  render() {
    const classes = this.props;
    return (
      <div className={classes.root}>
        <Grid columns={1}>
          <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="push"
              inverted
              visible
              vertical
              width="thin"
            >
              {this.state.streamer_list.map((item, i) => (
                <Menu.Item
                  key={i}
                  id={i}
                  onClick={this.ClickHandler}
                >
                  <Image src={item.avatar} alt="toto" avatar />
                  <span>{item.nickname}</span>
                </Menu.Item>
              ))}
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.dimmed} style={{backgroundColor: "#442d6b" }}>
            <StreamerDetail />
            <StreamerList
            userList={this.props.userList}
            removeStreamer={this.props.removeFollow}
            isDelete
          />
            </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
