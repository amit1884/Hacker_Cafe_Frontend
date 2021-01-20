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
import food from '../assets/images/food.png'
import {Radio,FormControlLabel,RadioGroup,} from '@material-ui/core';

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
    color:'#fff',
    '&:hover':{
      background:'orange',
      fontSize:'20px',
      fontWeight:'500',
      color:'#fff',
    }
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
  const [time,settime]=useState('')
  const [MenuArray,setMenuArray]=useState([])
  const [CurrOrder,setCurrOrder]=useState([])
  const [OpenOrder,setOpenOrder]=useState(false)
  const [Total,setTotal]=useState(0)
  const [IsDisabled,setIsDisabled]=useState(true)
  const [RadioValue,setRadioValue]=useState('')
  const [Confirm,setConfirm]=useState(false)
  const [cardData,setcardData]=useState({
    number:'',
    name:'',
    expiry:'',
    cvv:''
  })
  // Getting the list of menus
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
  const handleRadio=(value)=>{
    setRadioValue(value)
    if(value==='COD'||value==='CARD')
    setIsDisabled(false)
    else
    setIsDisabled(true)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
// Adding order to current order list
 const AddItem=(item)=>{
  console.log(item) 
  let newData=[...CurrOrder,
    {_id:item._id,
      title:item.title,
      type:item.type,
      details:item.details,
      price:item.price,
      qty:item.qty,
      img:item.img
    }]
    setTotal(Total+parseInt(item.price))
  setCurrOrder(newData)
  // localStorage.setItem('Order',JSON.stringify(CurrOrder))
  console.log(CurrOrder)
 }
//  Removing single item from current order list
 const RemoveItem=(item,data)=>{
  console.log(item)
  if(CurrOrder.length===1)
  {
  setCurrOrder([])
  setTotal(0)
  }
  else{
   let arr=[...CurrOrder]
   arr.splice(item,1)
   console.log(arr)
   setTotal(Total-parseInt(data.price))
   setCurrOrder(arr)
  }
 }
//  Clearing the current order list
 const ClearOrder=()=>{
   console.log('order clear')
   setCurrOrder([])
 }

//  Adding order in users Order history

 const AddOrder=()=>{
  axios.post(`http://localhost:5000/addorder`,{
    currOrder:CurrOrder
  },{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    }
  })
  .then(res=>{
    console.log('Order Added ',res.data)
    setConfirm(true)
    settime(res.data.time)
  })
  .catch(err=>console.log(err))
 }
// Card form for Payment 
 const handleCard=(e)=>{
   const values={cardData}
   console.log(values)
  values[e.target.name]=e.target.value
  setcardData(values)
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
          <Tab label="Starters" {...a11yProps(0)} />
          <Tab label="MainCourse" {...a11yProps(1)} />
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
                        <Button variant="contained" className={classes.pricebtn}>Rs.{Total}.00</Button>
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
                    <img src ={items.img} alt="items"/>
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

      {/* Current Order List . */}
      {
        OpenOrder?
        <div className="Current_order_Container">
        <div className="Current_order_box">
          <button className="closebtn" onClick={()=>setOpenOrder(false)}>X</button>
             {
               CurrOrder.length>0?
               <>
            <table className="order_table">
            <tr><td colSpan="5"><h3 style={{textAlign:'center',}}>Current Order</h3></td></tr>
            <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
            </tr>
            <tbody>
               {
                 CurrOrder.map((items,index)=>{
                  return(
                    <tr>
                      <td>{index+1}</td>
                      <td><img src={items.img} alt="" width="50" height="50" className="food_img"/></td>
                      <td>{items.title}</td>
                      <td>Rs.{items.price}</td>
                      <td><Button variant="outlined"color="secondary" onClick={()=>RemoveItem(index,items)}disabled={Confirm}>Remove</Button></td>
                    </tr>
                  )
                  
                }
                )
               }
               <tr>
                <td colSpan="3" style={{textAlign:'center',fontWeight:'550',fontSize:'20px'}}>Total</td>
                <td colSpan="2" style={{textAlign:'center',fontWeight:'550',fontSize:'20px'}}>Rs. {Total}.00/-</td>
               </tr>
              {
                Confirm?
                <tr>
                <td colSpan="5">
                    <p>Order placed successfully !!!</p>
                    <p>Your order will be ready in {time}.</p>
                </td>
              </tr>:null
              }
               </tbody>
               </table>
               <div className="payment_side">
                <RadioGroup aria-label="Required" name="payment_mode" value={RadioValue} onChange={(e)=>handleRadio(e.target.value)}>
                <FormControlLabel value="COD" control={<Radio />} label="Cash on delivery" />
                <FormControlLabel value="CARD" control={<Radio />} label="Credit Card" />
                </RadioGroup>
                  {
                    RadioValue==='CARD'?
                    <div className="payment_card">
                      <label>Card Number</label><br/>
                      <input type="text" name="number" value={cardData.number} onChange={(e)=>handleCard(e)}placeholder="Card Number"/><br/>
                      <label>Name</label><br/>
                      <input type="text" name="name" value={cardData.name} onChange={(e)=>handleCard(e)}placeholder="Owner Name"/><br/>
                      <label>Expiry</label><br/>
                      <input type="text" name="expiry" value={cardData.expiry} onChange={(e)=>handleCard(e)}placeholder="MM/YY"/><br/>
                      <label>CVV</label><br/>
                      <input type="text" name="cvv" value={cardData.cvv} onChange={(e)=>handleCard(e)}placeholder="cvv"/><br/>
                      {/* <button style={{border:'none',background:"#E2075B",outline:'none',color:'#fff',padding:'5px',cursor:'pointer'}} onClick={()=>setIsDisabled(false)}>Submit</button> */}
                    </div>
                    :null
                  }
                <div style={{display:'flex',justifyContent:'space-around'}}>
                <button  className="placeorder_btn"onClick={AddOrder} disabled={IsDisabled}>Place Order</button>&nbsp;&nbsp;
                <button style={{border:'none',background:"#E2075B",outline:'none',color:'#fff',padding:'10px',cursor:'pointer'}} onClick={ClearOrder}>Clear Order</button>
                </div>
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
      <button className='food_btn  animate__animated  animate__tada'onClick={()=>setOpenOrder(true)}>
        <img src ={food} alt="" width="80" height="80"/>
        <p style={{color:'#fff',background:'darkblue',padding:'3px',borderRadius:'5px'}}>Checkout</p>
      </button>
    </div>
  );
}
