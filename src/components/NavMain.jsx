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


// import "../styles/NavMain.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  return (
  //   <nav className="NavMain">
  //     <NavLink exact to="/">
  //       <h3 className="logo">App name</h3>
  //     </NavLink>
  //     <ul className="nav-list">
  //       {context.isLoggedIn && (
  //         <React.Fragment>
  //           <li>
  //             <NavLink to="/profile">
  //               {context.user && context.user.email}
  //             </NavLink>
  //           </li>
  //           <li>
  //             <p onClick={handleLogout}>Logout</p>
  //           </li>
  //         </React.Fragment>
  //       )}
  //       {!context.isLoggedIn && (
  //         <React.Fragment>
  //           <li>
  //             <NavLink to="/signin">Log in</NavLink>
  //           </li>
  //           <li>
  //             <NavLink to="/signup">Create account</NavLink>
  //           </li>
  //         </React.Fragment>
  //       )}
  //     </ul>
  //   </nav>


   <div className={classes.root}>

    <MuiThemeProvider theme={darkTheme}>
      <AppBar position="sticky" style={{backgroundColor: "black"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider >
    </div>


   );
};

export default withUser(NavMain);
