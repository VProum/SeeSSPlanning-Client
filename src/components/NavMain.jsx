import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
//import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "red",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// const darkTheme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// });

const NavMain = (props) => {
  const { context } = props;
  const { user } = props.context;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
        window.location = "http://localhost:3000";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const classes = useStyles();

  function handleLogin() {
    console.log(process.env);

    const uri = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BACKEND_URL}/auth/twitch/callback&response_type=code&scope=user:read:email`;

    //"https://id.twitch.tv/oauth2/authorize?client_id=m3vo1t7dvgtkfb9korsfpzlgjrh5vk&redirect_uri=http://localhost:8080/auth/twitch/callback&response_type=code&scope=user:read:email";

    window.location = uri;
  }

  return (
    <div className={classes.root}>
      {console.log(user)}
      {/* <MuiThemeProvider theme={darkTheme}> */}
      <AppBar position="sticky" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <NavLink exact to="/">
              <HomeIcon fontSize="large" />
            </NavLink>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink exact to="/planning">
              {user && <span style={{ marginRight: "5%" }}>Planning</span>}
            </NavLink>
            <NavLink exact to="/schedule/edit">
              {user && user[0].isStreamer &&
                <span style={{ marginRight: "5%" }}>Schedule</span>
              }
            </NavLink>
            <NavLink exact to="/user/edit">
              {user && (
                <span style={{ marginRight: "5%" }}>{user[0].nickname}</span>
              )}
            </NavLink>
            <NavLink exact to="/user/edit">
              Contact
            </NavLink>
          </Typography>
          
          {!user && <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>}
          { user && <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>}
        </Toolbar>
      </AppBar>
      {/* </MuiThemeProvider > */}
    </div>
  );
};

export default withUser(NavMain);
