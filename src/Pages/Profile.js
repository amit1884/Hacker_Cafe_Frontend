import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import Footer from '../components/Footer'
// import {Link,useHistory} from 'react-router-dom'
function Profile() {
    const [UserData,setUserData]=useState({})
    useEffect(()=>{
        console.log('Local ',JSON.parse(localStorage.getItem('user')))
        const LocalData=JSON.parse(localStorage.getItem('user'))
        axios.get(`https://hackercafe.herokuapp.com/user/${LocalData._id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        })
        .then(res=>{
            console.log('UserData',res.data)
            setUserData(res.data.user)
        })
        .catch(err=>console.log(err))
    },[])
    return (
        <div className="user_profile_conatiner"  style={{overflowX:'hidden'}}>
            <div className="divider"></div>
            <div className="user_details">
                <div className="user_table">
                    <table>
                        <tbody>
                            <tr  style={{background:'darkblue',color:'#fff',padding:'10px'}}>
                                <td colSpan="2">User Details</td>
                            </tr>
                        <tr>
                            <td>Name</td>
                            <td>{UserData.name}</td>
                        </tr>
                        <tr>
                            <td>Organisation Name</td>
                            <td>{UserData.org_name}</td>
                        </tr>
                        <tr>
                            <td>Employee Id</td>
                            <td>{UserData.emp_id}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{UserData.email}</td>
                        </tr>
                        <tr>
                            <td>Mobile</td>
                            <td>{UserData.mobile}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="user_id">
                <img src ={UserData.id_pic} alt=""/>
                </div>
            </div>
                <br/>
                <h1 style={{background:'#000',color:'#fff',padding:'10px',textAlign:'center'}}>Order History</h1>
            <div className="order_history">
            {
                UserData.orders?
                UserData.orders.map(items=>{
                    return(
                        <table>
                            <tbody>
                            <tr style={{background:'darkblue',color:'#fff',padding:'10px'}}>
                                <td colSpan="3" style={{padding:'10px',fontWeight:'600',fontSize:'20px'}}>Date of order:&nbsp;&nbsp;
                                    {`${new Date(items.orderDate).getDate()}-${new Date(items.orderDate).getMonth()+1}-${new Date(items.orderDate).getFullYear()}`}
                                </td>
                            </tr>
                            <tr>
                                {/* <td>Id.</td> */}
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price</th>
                            </tr>
                        {
                            items.order.map(data=>{
                                return(
                                    <tr>
                                        {/* <td>{index+1}</td> */}
                                        <td>{data.title}</td>
                                        <td><img src={data.img} alt="" width="50" height="50" style={{borderRadius:'50%'}}/></td>
                                        <td>Rs. {data.price}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        </table>
                    )
                })
                :
                <div style={{display:'flex',justifyContent:'center',alignItems:'centers'}}>
                    <h3>
                        You have not ordered till now.<br/>
                        Order Now !!
                    </h3>

                </div>
            }
            </div>
            <Footer/>
        </div>
    )
}

export default Profile
