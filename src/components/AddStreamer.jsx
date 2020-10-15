import React, { Component } from "react";
import FilterBar from "../components/FilterBar";
import StreamerCard from "../components/StreamerCard";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import apiHandler from "../api/apiHandler"

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
  }

  state = {
    filterValue: "",
    streamer_list: []
  };

  async componentDidMount() {
    const donotmutate = await apiHandler.getStreamer();
    this.setState({
        streamer_list: donotmutate
    })
  }

  render() {
    const classes = this.props;
    return (
      <div className={classes.root}>
        <FilterBar></FilterBar>
        <div style={{ display: "grid",
    width: "30%" }}>
          <GridListTile key={0}>
            <img src="https://static-cdn.jtvnw.net/user-default-pictures-uv/75305d54-c7cc-40d1-bb9c-91fbe85943c7-profile_image-300x300.png"></img>
            <GridListTileBar title={"toto "} />
          </GridListTile>

          
        </div>

        <StreamerCard></StreamerCard>
      </div>
    );
  }
}
