import React, { Component } from "react";
import FilterBar from "../FilterBar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

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

class FormDisplayStreamer extends Component {
  state = {
    streamerFiltered: [],
  };

  handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  handleClick = () => {
    console.info("You clicked the Chip.");
  };

  handleSearch = (value) => {
    console.log(value)
    this.setState({
      streamerFiltered: value,
    });
  };

  render() {
    const { classes } = this.props;
    console.log("lift the state up: ", this.state.streamerFiltered);
    
    console.log("length: ", this.state.streamerFiltered.length);
    
    if(this.state.streamerFiltered.length > 0){
      console.log(this.state.streamerFiltered, "<<< not empty streamer")
    
    }
    return (
      <div
        className={classes.root}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1>youhou</h1>
        <FilterBar filterSearch={this.handleSearch} />
        <br />
        <div>
          <p>Les personnes suivantes peuvent modifier le planning</p>
          
        </div>
        <br />
        <div>
          {/* {this.state.streamerFiltered.name && ( */}
          <React.Fragment>
                <Chip
                  avatar={<Avatar alt={this.state.streamerFiltered.nickname} src={this.state.streamerFiltered.avatar} />}
                  label={this.state.streamerFiltered.nickname}
                  onDelete={this.handleDelete}
                />
            </React.Fragment>
          {/* )} */}

          <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label="Deletable"
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(FormDisplayStreamer);
