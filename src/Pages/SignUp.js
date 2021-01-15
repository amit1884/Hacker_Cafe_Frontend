import React ,{useState,useRef}from 'react'
import {Link,useHistory} from 'react-router-dom'
import Preview from '../components/Preview';
const Backend_url='http://localhost:5000'
function SignUp() {
    const textInput = useRef(null);
    const history=useHistory()
    const [open, setOpen] =useState(false);
    const [Name,setName]=useState('')
    const [Org_Name,setOrg_Name]=useState('')
    const [Emp_ID,setEmp_ID]=useState('')
    const [Mobile,setMobile]=useState('')
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [File,setFile]=useState('')
    const [Url,setUrl]=useState(undefined)
    const [Loading,setLoading]=useState(false)
    const [Error,setError]=useState('')
    const TriggerUpload=(e)=>{
        e.preventDefault()
        console.log(textInput.current)
         textInput.current.click()
    }

    const UploadFields=()=>{
          fetch(Backend_url+"/signup",{
              method:"post",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                 name:Name,
                 emp_id:Emp_ID,
                 org_name:Org_Name,
                 mobile:Mobile,
                 email:Email,
                 password:Password,
                 id_pic:Url
              })
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data)
              if(data.status===1)
              history.push('/login')
              else
              {
                setError(data.message)
              }
             
          })
          .catch(err=>{
              console.log(err)
          })
    }
    const handleOpen = () => {
      setLoading(true)
      const data=new FormData()
      data.append("file",File)
      data.append("upload_preset","instagram-clone")
      data.append("cloud_name","webarts")
  
      fetch("https://api.cloudinary.com/v1_1/webarts/image/upload",{
        method:"post",
        body:data
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setUrl(data.url)
        setLoading(false)
        setOpen(true)
      })
      .catch(err=>{
        console.log(err)
      })
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      
   
    return (
             <div className="login_container">
            <div className="signup_wrapper">
                <div className="logo_container">
                    <h2>Hacker Cafe</h2>
                    {Error}
                </div>
                <div className="form_container">
                    <input type="text" placeholder="Full Name" pattern="(/^[A-Za-z\s-, ]+$/)" title="Only letters are allowed (A-Z,a-z)"value={Name} onChange={(e)=>setName(e.target.value)} required/>
                    <input type="text" placeholder="Organisation Name" value={Org_Name} onChange={(e)=>setOrg_Name(e.target.value)} required/>
                    <input type="text" placeholder="Employee Id" value={Emp_ID} onChange={(e)=>setEmp_ID(e.target.value)} required/>
                    <input type="number" placeholder="Mobile No." value={Mobile} onChange={(e)=>setMobile(e.target.value)} required/>
                    <input type="email" placeholder="Email" value={Email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" value={Password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <input type="file"ref={textInput} style={{display:'none'}}  onChange={(e)=>setFile(e.target.files[0])}/>
                    <button onClick={TriggerUpload} className="upload_btn">
                        Upload Id
                    </button>
                    <div className="btn_wrapper">
                    <button  onClick={handleOpen} className="signup_btn">{Loading?'Loading..':'Preview'}</button>
                    <button onClick={UploadFields} type="submit" className="signup_btn">SignUp</button>
                </div>
                </div>
                <Link to="/login">Already have an account?</Link>
        </div>
        {open?
        <Preview 
          open={open} 
          handleClose={handleClose} 
          submitHandler={UploadFields}
          data={{Name,Org_Name,Emp_ID,Mobile,Email,Url}}
          />
                :null}
        </div>
    )
}

export default SignUp
