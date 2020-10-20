import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const StreamerList = (props) => {
  const classes = useStyles();
  function addStreamerHandler(event) {
    console.log(event.currentTarget);
  }


  function deleteHandler(event) {
      //console.log("delete", event.currentTarget.id);
      props.removeStreamer(event.currentTarget.id);
  }

  return (
    <div>
      <h1>Streamers you follow</h1>
      {props.userList.map((item, i) => (
          <div key={"toto"+i}>
        <GridListTile key={i} id={i} onClick={addStreamerHandler}>
          <img src={item.avatar} alt="blur"></img>
          <GridListTileBar title={item.nickname} />
        </GridListTile>
            {props.isDelete && <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={deleteHandler}
              id={i}
            >
              remove
            </Button>}
            </div>
      ))}
    </div>
  );
};

export default StreamerList;
