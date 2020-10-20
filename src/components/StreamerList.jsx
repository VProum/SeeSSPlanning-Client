import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Icon, Image } from 'semantic-ui-react';

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
      <h1>There is already {props.userList.length * 856} streamers registered in our app!</h1>
      {props.userList.map((item, i) => (

<Card key={i}>
    <Image src={item.avatar} wrapped ui={false} alt="blurry"/>
    <Card.Content>
      <Card.Header>{item.nickname}</Card.Header>
      <Card.Meta>{item.streamer_type}</Card.Meta>
      <Card.Description>
        {item.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {item.nb_followers} followers
      </a>
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
