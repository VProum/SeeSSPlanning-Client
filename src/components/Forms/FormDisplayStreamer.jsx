import React, { Component } from 'react'
import FilterBar from "../FilterBar";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
});

class FormDisplayStreamer extends Component {
    
  
   handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

   handleClick = () => {
    console.info('You clicked the Chip.');
  };

  handleSearch = (value) => {
    console.log('HandleSearch : ', value);
  }


render() {
    const { classes } = this.props;
    
    return (

        <div className={classes.root}>
       <h1>youhou</h1>
                <FilterBar filterSearch={this.handleSearch} />
                < br />
                <p>
                   Les personnes suivantes peuvent modifier le planning
              </p>
              < br />

      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Deletable"
        onDelete={this.handleDelete}
      />
     
    </div>
  );
}
}


export default withStyles(useStyles)(FormDisplayStreamer);
