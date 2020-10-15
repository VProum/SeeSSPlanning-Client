import React, { Component } from "react";
import { withUser } from "../components/Auth/withUser";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "75%",
    },
    "& .MuiFormControl-root": {
      width: "75%",
    },
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class EditSchedule extends React.Component {
  state = {
    tata: "",
  };

  handleChange = (e) => {
    console.log("name: ", e.target.name, "    value: ", e.target.value);
  };

  handleDateChange = (date) => {
    console.log(date);
  };

  valuetext = (value) => {
      let oldValue ="";
      if(oldValue !== value){
          console.log(value);
        return `${value}°C`;
      }
  };

  render() {
    const { classes } = this.props;

    const marks = [
      {
        value: 1,
        label: "1h",
      },
      {
        value: 2,
        label: "2h",
      },
      {
        value: 3,
        label: "3h",
      },
      {
        value: 4,
        label: "4h",
      },
      {
        value: 5,
        label: "5h",
      },
      {
        value: 6,
        label: "6h",
      },
      {
        value: 7,
        label: "7h",
      },
      {
        value: 8,
        label: "8h",
      },
      {
        value: 9,
        label: "9h",
      },
      {
        value: 10,
        label: "10h",
      },
      {
        value: 11,
        label: "11h",
      },
      {
        value: 12,
        label: "12h",
      },
    ];

    return (
      <div className={`${classes.root} margin-left`}>
        <Grid container spacing={3} style={{ marginTop: "1%" }}>
          <Grid item xs={6}>
            Add a stream in schedule
            <br />
            <form className={classes.root} noValidate autoComplete="off">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="flex-start">
                  <KeyboardTimePicker
                    id="time-picker"
                    label="Start Hour"
                    //  value={selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{ "aria-label": "change time" }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <br />

              <Typography id="discrete-slider-always" gutterBottom>
                Always visible
              </Typography>
              <Slider
                defaultValue={3}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                min={1}
                max={12}
                marks={marks}
                valueLabelDisplay="on"  
              />

              <br />
              <TextField
                id="outlined-basic"
                defaultValue="pouet"
                name="tata"
                label="tata"
                variant="outlined"
                onChange={this.handlechange}
              />
            </form>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(withUser(EditSchedule));
