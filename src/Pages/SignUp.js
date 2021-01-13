import React ,{useState,useRef}from 'react'
import {Link} from 'react-router-dom'
import Preview from '../components/Preview';
import Modal from '../components/Preview';
function SignUp() {
    const textInput = useRef(null);
    const [open, setOpen] =useState(false);
    const [Name,setName]=useState('')
    const [Org_Name,setOrg_Name]=useState('')
    const [Emp_ID,setEmp_ID]=useState('')
    const [Mobile,setMobile]=useState('')
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [File,setFile]=useState('')
    const [Url,setUrl]=useState(undefined)
    const TriggerUpload=(e)=>{
        e.preventDefault()
        console.log(textInput.current)
         textInput.current.click()
    }
    const SubmitHandler=(e)=>{
        e.preventDefault();
        console.log('Submit')
        console.log(Name,Org_Name,Emp_ID,Mobile,Email,Password,File)
    }
    const handleOpen = () => {
        console.log('modal open triggere')
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (
             <div className="login_container">
            <div className="signup_wrapper">
                <div className="logo_container">
                    <h2>Hacker Cafe</h2>
                </div>
                <form className="form_container" onSubmit={SubmitHandler}>
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
                    <button  onClick={handleOpen} className="signup_btn">Preview</button>
                    <button  onClick={SubmitHandler}type="submit" className="signup_btn">SignUp</button>
                </div>
                </form>
                <Link to="/login">Already have an account?</Link>
        </div>
        {open?<Preview open={open} handleClose={handleClose} submitHandler={SubmitHandler}/>:null}
        </div>
    )
}

export default SignUp
