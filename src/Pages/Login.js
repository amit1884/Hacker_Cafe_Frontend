import React ,{useState,useContext}from 'react'
import {UserContext} from '../App'
import {Link,useHistory} from 'react-router-dom'
const url='http://localhost:5000'
function Login() {
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [Error,setError]=useState(false)
    const [ErrorMsg,setErrorMsg]=useState('')
    const {dispatch}=useContext(UserContext)
    const history=useHistory();
    const SubmitHandler=(e)=>{
        e.preventDefault()
        if(Email===''||Password==='')
        {
            setErrorMsg('All Fields are required !!')
            setError(true)
        }
        else{
            fetch(`${url}/signin`,{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:Email,
                    password:Password
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.status===0){
                    setError(true)
                    setErrorMsg(data.message)
                }
                else if(data.status===1){
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    console.log("Logged In Successfully")
                    history.push('/')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    return (
        <div className="login_container">
            <div className="login_wrapper">
                <div className="logo_container">
                    <h2>Hacker Cafe</h2>
                    {Error?<p>{ErrorMsg}</p>:null}
                </div>
                <form className="form_container" onSubmit={SubmitHandler}>
                    <input type="text" placeholder="amit@microsoft.com" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="123456" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="login_btn">Login</button>
                </form>
               <Link to ='/signup'>Don't have an account?</Link>
        </div>
        </div>
    )
}

export default Login
