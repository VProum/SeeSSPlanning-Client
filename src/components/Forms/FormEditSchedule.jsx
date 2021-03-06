import React from "react";
import { withUser } from "../Auth/withUser";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import apiHandler from "../../api/apiHandler";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


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
    hour_day: null,
    duration: 3,
    weekday: "",
    image:"",

    schedule_obj: {
      hour_day: null,
      duration: 3,
      weekday: "",
      image:"",
    },
    schedule_list: [],
    planning_image: "",
  };

  componentDidMount() {
    this.setState({
      schedule_list: this.props.schedule_list,
    });
  }

  handleChange = (e) => {
    this.setState({
      lastname: e.target.value,
    });
    return e;
  };

  handleDateChange = (date) => {
    this.setState((prevState) => ({
      hour_day: date,
      schedule_obj: { ...prevState.schedule_obj, hour_day: date },
    }));
  };

  valuetext = (event, value) => {
    let tmp = value;

    this.setState((prevState) => ({
      duration: tmp,
      schedule_obj: { ...prevState.schedule_obj, duration: tmp },
    }));
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    if(!this.state.schedule_obj.image){
      
    }

    if(this.props.context.user[0].planning_image){
      //console.log(this.props.context.user[0].planning_image, "<<<<<<<<<<<<");
    } else {
     // console.log("no picture?")
    }

    const fd = new FormData();

    for (const key in this.state.schedule_obj) {
        if(this.state.schedule_obj[key]){
            fd.append(key, this.state.schedule_obj[key]);
        }      
    }

    apiHandler
      .createScheduleOne(fd)
      .then((res) => this.props.addSchedule(res))
      .catch((err) => {
        console.log(err);
      });
  };

  handleSelectChange = (e) => {
    this.setState((prevState) => ({
      weekday: e.target.value,
      schedule_obj: { ...prevState.schedule_obj, weekday: e.target.value },
    }));
  };

  handleImgChange = (e) => {
    //const name = e.target.name;
    const value =  e.target.files[0];

    this.setState((prevState) => ({ 
      image: value,
      schedule_obj: { ...prevState.schedule_obj, image: value },
    }));
  }


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

    //const {user} = this.props.context;

    
    return (
      <div className={`${classes.root}`} style={{marginTop: "2%", marginLeft: "2%", fontSize:"1.3rem"}}>
        Add a stream in schedule
        <br />
        <form className={classes.root} onSubmit={this.handleSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
              <KeyboardTimePicker
                i="hour_day"
                name="hour_day"
                label="Start Hour"
                value={this.state.hour_day}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{ "aria-label": "change time" }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <br />

          <Typography id="discrete-slider-always" gutterBottom>
            Duration
          </Typography>
          <Slider
            id="duration"
            name="duration"
            aria-labelledby="discrete-slider-always"
            step={1}
            min={1}
            max={12}
            marks={marks}
            valueLabelDisplay="on"
            value={this.state.duration}
            onChange={this.valuetext}
            style={{width: "90%"}}
          />

          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="weekday">Weekday</InputLabel>
            <Select
              labelId="weekday"
              id="weekday"
              name="weekday"
              value={this.state.weekday}
              onChange={this.handleSelectChange}
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
            </Select>
            <br />
            <div>

      <p style={{marginTop:"2%", marginBottom: "1%", fontSize:"1.3rem"}}> Add your own weekly planning image  </p>
       <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        name="planning_image"
        onChange={this.handleImgChange}
        style={{display: "none"}}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="default"  component="span" className={classes.button}
        startIcon={<CloudUploadIcon />}>
          Upload
        </Button>
        {this.state.image && (
          <span className="edit-schedule-image-span">Uploaded file: {this.state.image.name}</span>
        )}
      </label>
            </div>

          </FormControl>

          <br />
          {/* <FormInput name="lastName" value={this.state.lastName} onChange={this.handleTest}>lastName</FormInput> */}
          <div className="edit-schedule-btn-save">

           <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            style={{ marginTop: "1%"}}
            type="submit"
          >
            Add Timeslot
          </Button>
          </div>

          {/* <Field name="lastName" value={this.state.lastName}>LastName</Field> */}
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(withUser(EditSchedule));