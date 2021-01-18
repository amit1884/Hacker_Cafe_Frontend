import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button} from '@material-ui/core'
import _ from 'lodash'
import axios from 'axios';
var i=0;
var totalPrice=0;
function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '90%',
  },
  pricebtn:{
    background:'orange',
    fontSize:'20px',
    fontWeight:'500',
    color:'#fff'
  },
  addbtn:{
    // background:'orange',
    fontSize:'20px',
    fontWeight:'500',
    color:'#fff'
  },
  orderbtn:{
    position:'fixed',
    top:'50%',
    left:'0',
    zIndex:'199',
    backgroundColor:' #1e1768',
    color:'#fff',
    marginTop:'10px'
  }
}));

export default function Menu() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  // const [AddStatus,setAddStatus]=useState(true)
  const [MenuArray,setMenuArray]=useState([])
  const [CurrOrder,setCurrOrder]=useState([])
  const [OpenOrder,setOpenOrder]=useState(false)
  useEffect(()=>{

    axios.get(`http://localhost:5000/menu`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    })
    .then(res=>{
      console.log(res.data)
      setMenuArray(res.data.data)
    })
    .catch(err=>console.log(err))
  },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

 const AddItem=(item)=>{
  console.log(item) 
  let newData=[...CurrOrder,{item}]
  setCurrOrder(newData)
  // localStorage.setItem('Order',JSON.stringify(CurrOrder))
  console.log(CurrOrder)
 }
 const RemoveItem=(item)=>{
  let newData=CurrOrder;
  newData=newData.pull()
 }
 const ClearOrder=()=>{
   console.log('order clear')
   setCurrOrder([])
 }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Breakfast" {...a11yProps(0)} />
          <Tab label="Lunch" {...a11yProps(1)} />
          <Tab label="Breads" {...a11yProps(2)} />
          <Tab label="Drinks" {...a11yProps(3)} />
          <Tab label="Desserts" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="menu_container">
          {
              MenuArray.map((items=>{
                if(items.type===1)
                {
                  return(
                    <div className="menu_card" style={{position:'relative'}} key={items._id}>
                      <div className="item_img">
                      <img src ={items.img}alt="items"/>
                      </div>
                      <div className="item_details">
                        <p class="title">{items.title}</p>
                        <p class="details">{items.details}</p>
                        <div className="menu_card_bottom_area">
                        <Button variant="contained" className={classes.pricebtn}>Rs.{items.price}.00</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant ="contained" color="secondary" className={classes.addbtn} onClick={()=>AddItem(items)}>Add</Button>
                        </div>
                        </div>
                    </div>
                )
                }
                else
                return null
              }))
          }
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <div className="menu_container">
          {
              MenuArray.map((items=>{
                if(items.type===2)
                {
                  return(
                    <div className="menu_card">
                      <div className="item_img">
                      <img src ={items.img}alt="items"/>
                      </div>
                      <div className="item_details">
                        <p className="title">{items.title}</p>
                        <p className="details">{items.details}</p>
                        <div className="menu_card_bottom_area">
                        <Button variant="contained" className={classes.pricebtn}>Rs.{items.price}.00</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant ="contained" color="secondary" className={classes.addbtn} onClick={()=>AddItem(items)}>Add</Button>
                        </div>
                      </div>
                    </div>
                )
                }
                else 
                return null
              }))
          }
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <div className="menu_container">
          {
              MenuArray.map((items=>{
                if(items.type===4)
                {
                  return(
                    <div className="menu_card">
                      <div className="item_img">
                      <img src ={items.img}alt="items"/>
                      </div>
                      <div className="item_details">
                        <p className="title">{items.title}</p>
                        <p className="details">{items.details}</p>
                        <div className="menu_card_bottom_area">
                        <Button variant="contained" className={classes.pricebtn}>Rs.{items.price}.00</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant ="contained" color="secondary" className={classes.addbtn} onClick={()=>AddItem(items)}>Add</Button>
                        </div>
                      </div>
                    </div>
                )
                }
                else return null
              }))
          }
          </div>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <div className="menu_container">
          {
             MenuArray.map((items=>{
               if(items.type===3)
               {
                return(
                  <div className="menu_card">
                    <div className="item_img">
                    <img src ={items.img}alt="items"/>
                    </div>
                    <div className="item_details">
                      <p className="title">{items.title}</p>
                      <p className="details">{items.details}</p>
                      <div className="menu_card_bottom_area">
                      <Button variant="contained" className={classes.pricebtn}>Rs.{items.price}.00</Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button variant ="contained" color="secondary" className={classes.addbtn} onClick={()=>AddItem(items)}>Add</Button>
                      </div>
                    </div>
                  </div>
              )
               }
               else return null
              }))
          }
          </div>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
        <div className="menu_container">
          {
              MenuArray.map((items=>{
                if(items.type===5)
                  {
                    return(
                      <div className="menu_card">
                        <div className="item_img">
                        <img src ={items.img}alt="items"/>
                        </div>
                        <div className="item_details">
                          <p className="title">{items.title}</p>
                          <p className="details">{items.details}</p>
                          <div className="menu_card_bottom_area">
                          <Button variant="contained" className={classes.pricebtn}>Rs.{items.price}.00</Button>
                          &nbsp;&nbsp;&nbsp;
                          <Button variant ="contained" color="secondary" className={classes.addbtn} onClick={()=>AddItem(items)}>Add</Button>
                          </div>
                        </div>
                      </div>
                  )
                }
                else return null
              }))
          }
          </div>
        </TabPanel>
      </SwipeableViews>
      {
        OpenOrder?
        <div className="Current_order_Container">
        <div className="Current_order_box">
          <button className="closebtn" onClick={()=>setOpenOrder(false)}>X</button>
          <h2>Current Order</h2>
             {
               CurrOrder.length>0?
               <>
            <table className="order_table">
            <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
            </tr>
            <tbody>
               {

                 CurrOrder.map(items=>{
                   i++;
                   totalPrice=totalPrice+parseInt(items.item.price)
                  return(
                    <tr>
                      <td>{i}</td>
                      <td><img src={items.item.img} alt="" width="50" height="50" className="food_img"/></td>
                      <td>{items.item.title}</td>
                      <td>Rs.{items.item.price}</td>
                      <td><Button variant="outlined"color="secondary">Remove</Button></td>
                    </tr>
                  )
                  
                }
                )
               }
               <tr>
                <td colspan="3" style={{textAlign:'center',fontWeight:'550',fontSize:'20px'}}>Total</td>
                <td colspan="2" style={{textAlign:'center',fontWeight:'550',fontSize:'20px'}}>Rs. {totalPrice}.00/-</td>
               </tr>
               </tbody>
               </table>
               <div>
              <Button variant="contained" color="Primary">Confirm Order</Button>&nbsp;&nbsp;
              <Button variant="contained" color="secondary" onClick={ClearOrder}>Clear Order</Button>
              </div>
               </>
               :  
               <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100% '}}>
               <p style={{textAlign:'center',fontSize:'20px'}}>
               You have not ordered anything. 
                </p>
            </div>
             }
        </div>
      </div>
      :null
      }
      <Button className={classes.orderbtn}onClick={()=>setOpenOrder(true)}>Current Order</Button>
    </div>
  );
}
