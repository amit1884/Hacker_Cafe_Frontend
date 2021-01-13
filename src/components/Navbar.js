import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin:'10px'
  },
  appbar:{
      background:'rgba(0,0,0,0.3)'
  }
}));

function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <span style={{fontFamily: 'Great Vibes, cursive',fontSize:'35px'}}>Hacker Cafe</span>
          </Typography>
            <div className="right-menu-items" style={{display:'flex'}}>
                <Typography variant="h6" className={classes.title}>
                <Link to ="/" style={{color:'#fff'}}>Home</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                <a href ="#menu" style={{color:'#fff'}}>Menu</a>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                <Link to ="/login" style={{color:'#fff'}}>Login</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                <Link to ="/signup" style={{color:'#fff'}}>SignUp</Link>
                </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;