import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import apiHandler from "../api/apiHandler";


const useStyles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
});

class FilterBar extends Component {
constructor(props){
  super(props);
  let typing = null;
}


state = {
    streamerFiltered: [],
    test :true
  };


  // handleChange = (e) => {
  //   this.props.filterSearch(e.currentTarget.value);
  // }

  clickHandler = (value) => {
    apiHandler
    .getFilteredStreamer(value)
    .then(dbRes => {
      const filteredStreamer = dbRes;
      this.setState({
        streamerFiltered: filteredStreamer
      })

    });
  }

  handleChange =(e) => {
    let searchValue = e.target.value;
    clearTimeout(this.typing);
    this.typing = setTimeout(() => this.clickHandler( searchValue), 500);
  }

  handleSearchStreamer = (value) => {
    this.props.filterSearch(value);
   // document.getElementById("searchUl").removeChild();
    this.setState({
      test: false,
    });
   
  }

render() {

    const { classes } = this.props;
    if(this.state.streamerFiltered.length > 0){
    }
    return (
      <div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Find a streamer" style={{width: "33vw"}} onChange={this.handleChange}/>
            </Grid>
          </Grid>
        </div>
        {this.state.streamerFiltered.length >0 && this.state.test && (
          <ul id="searchUl">
            {this.state.streamerFiltered.map((streamer, index) => (
              <li key={index} onClick={() => this.handleSearchStreamer(streamer)}>{streamer.nickname}</li>
            ))}
            
          </ul>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(FilterBar);
