import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'red',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
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

  };

function handleLogout(){
  apiHandler.logout();
}

  

  return (
  


   <div className={classes.root}>

    {/* <MuiThemeProvider theme={darkTheme}> */}
      <AppBar position="sticky" style={{backgroundColor: "black"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" onClick={handleLogin}>Login</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    {/* </MuiThemeProvider > */}
    </div>


   );
};

export default withUser(NavMain);
