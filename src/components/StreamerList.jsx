import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Icon, Image } from "semantic-ui-react";
import DeleteIcon from '@material-ui/icons/Delete';

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
    marginLeft:  "15px",
    width: props.isDelete? "90vw":"100vw",
    height: "98vh"
  };

  return (
    <div className="streamer-list" style={divStyle}>
      {props.userList.map((item, i) => (
        <Card key={i} color='teal' 
        style ={{height: "250px",
                 width:"175px" }}
        >
          <Image src={item.avatar} wrapped ui={false} alt="blurry" />
          <Card.Content style={{background: "#e6ddf0"}}>
            <Card.Header>{item.nickname}</Card.Header>
            <Card.Meta>{item.streamer_type}</Card.Meta>
            <Icon name="users" />
            {item.nb_followers} followers
          
          {props.isDelete && 
            <Button
            color="primary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={deleteHandler}
            id={i}
            >remove
               </Button>}
            </Card.Content>
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
