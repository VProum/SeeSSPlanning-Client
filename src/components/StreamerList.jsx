import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Icon, Image } from "semantic-ui-react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const StreamerList = (props) => {
  const classes = useStyles();

  function deleteHandler(event) {
    //console.log("delete", event.currentTarget.id);
    props.removeStreamer(event.currentTarget.id);
  }

  const divStyle = {
    marginLeft: "15px",
    width: props.isDelete ? "80vw" : "100vw",
    minHeight: "100vh",
  };

  return (
    <div className="streamer-list" style={divStyle}>
      {props.userList.map((item, i) => (
        <Card key={i} color="teal">
          <Link to={`/user/planning/${item.twitch_id}`}>
            <Image src={item.avatar} wrapped ui={false} alt="blurry" />
              </Link>
            <Card.Content style={{ background: "#e6ddf0" }}>
            <Link to={`/user/planning/${item.twitch_id}`}>
              <Card.Header>{item.nickname}</Card.Header>
              <Card.Meta>{item.streamer_type}</Card.Meta>
              <Icon name="users" />
              {item.nb_followers} followers
              </Link>
              {props.isDelete && (
                <Button
                  color="primary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={deleteHandler}
                  id={i}
                >
                  remove
                </Button>
              )}
            </Card.Content>
          </Card>
      ))}
    </div>
  );
};

export default StreamerList;
