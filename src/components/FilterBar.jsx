import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
});

class FilterBar extends Component {

  handleChange = (e) => {
    this.props.filterSearch(e.currentTarget.value);
  }


  render() {
    const { classes } = this.props;
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
      </div>
    );
  }
}

export default withStyles(useStyles)(FilterBar);
