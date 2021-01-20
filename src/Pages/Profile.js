import React ,{useState,useEffect}from 'react'
import axios from 'axios'
// import {Link,useHistory} from 'react-router-dom'
function Profile() {
    const [UserData,setUserData]=useState({})
    useEffect(()=>{
        console.log('Local ',JSON.parse(localStorage.getItem('user')))
        const LocalData=JSON.parse(localStorage.getItem('user'))
        axios.get(`http://localhost:5000/user/${LocalData._id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        })
        .then(res=>{
            console.log(res.data)
            setUserData(res.data)
        })
        .catch(err=>console.log(err))
    },[])
    return (
        <div>
{UserData}
        </div>
    )
}

export default Profile
