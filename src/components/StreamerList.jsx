import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import Icone from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Icon, Image } from "semantic-ui-react";

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

  const divStyle = {
    marginLeft: props.isDelete? "10vw": "0",
    marginTop: "3vh",
    width: props.isDelete? "90vw":"100vw",
    height: "95vh"
  };

  return (
    <div className="streamer-list" style={divStyle}>
      {props.userList.map((item, i) => (
        <Card key={i} color='teal'>
          <Image src={item.avatar} wrapped ui={false} alt="blurry" />
          <Card.Content style={{background: "#e6ddf0"}}>
            <Card.Header>{item.nickname}</Card.Header>
            <Card.Meta>{item.streamer_type}</Card.Meta>
            <Icon name="users" />
            {item.nb_followers} followers
          
            </Card.Content>
          {props.isDelete && 
            <Button
            color="primary"
            className={classes.button}
            startIcon={<Icone className="fa fa-plus-circle" color="primary" />}
            onClick={deleteHandler}
            id={i}
            >remove
               </Button>}
        </Card>

        // <div key={"toto"+i}>
        // <img src={item.avatar} alt="blur"></img>
        // <h3>{item.nickname}</h3>
        //   {props.isDelete && <Button
        //     variant="contained"
        //     color="secondary"
        //     className={classes.button}
        //     startIcon={<DeleteIcon />}
        //     onClick={deleteHandler}
        //     id={i}
        //   >
        //     remove
        //   </Button>}
        //   </div>
      ))}
    </div>
  );
};

export default StreamerList;
