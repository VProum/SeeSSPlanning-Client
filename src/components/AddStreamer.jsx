import React, { Component } from "react";
import FilterBar from "../components/FilterBar";
import StreamerCard from "../components/StreamerCard";

import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import apiHandler from "../api/apiHandler";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  "& .MuiGridList-root": {
    width: "30%",
  },
}));

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
    console.log("addstreamer did mount");
    this.setState({
      streamer_list: donotmutate,
    });
  }

  async ClickHandler(event) {
    let indispensable = this.state.streamer_list[event.currentTarget.id];
    console.log("indispensable", indispensable)
    if (this.props.userList.filter(function(item){ return item._id === indispensable._id }).length === 0) {
      const dbResult = await apiHandler.addFollowStreamer(indispensable._id);
      this.props.addStreamer(indispensable);
    }
  }

  render() {
    const classes = this.props;
    return (
      <div className={classes.root}>
        <FilterBar />
        <div style={{ display: "grid", width: "30%" }}>
          {this.state.streamer_list.map((item, i) => (
            <GridListTile key={item._id} id={i} onClick={this.ClickHandler}>
              <img src={item.avatar} alt="blur"></img>
              <GridListTileBar title={item.nickname} />
            </GridListTile>
          ))}
        </div>
      </div>
    );
  }
}
