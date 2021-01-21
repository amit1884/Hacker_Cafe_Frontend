import React,{useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerOff from '@material-ui/icons/PowerOff'
import HomeIcon from '@material-ui/icons/HomeRounded'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const useStyles = makeStyles((theme)=>({

  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  appbar:{
      background:'rgba(0,0,0,0.9)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    width:'70px',
   position:'absolute',
   right:'0'

  },
}));

export default function MobileNav() {
  const {dispatch}=useContext(UserContext)
  const history=useHistory()
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const Logout=()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push("/login")
}
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="top_area">
          <h2>Hacker Cafe</h2>
      </div>
      <Divider/>
      <List>
        <ListItem>
          <Link to ="/" style={{fontSize:'20px',color:'#000',padding:'8px'}}><HomeIcon/>&nbsp;&nbsp;Home</Link>
        </ListItem>
        <ListItem>
          <Link to ="/profile" style={{fontSize:'20px',color:'#000',padding:'8px'}}>
          <AccountCircle />&nbsp;&nbsp;
            Profile</Link>
        </ListItem>
        <ListItem onClick={Logout} style={{fontSize:'20px',color:'#000',padding:'10px 25px'}}><PowerOff/>&nbsp;&nbsp;Logout</ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="fixed" className={classes.appbar} style={{background:'#000'}}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <IconButton onClick={toggleDrawer(anchor, true)} edge="start" className={classes.menuButton}style={{color:'#000'}} aria-label="menu">
            <MenuIcon fontSize='large'/>
          </IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </AppBar>
  );
}
