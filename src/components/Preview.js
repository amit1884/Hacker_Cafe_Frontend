import React from 'react'
import Modal from '@material-ui/core/Modal';
import img from '../assets/images/juice.jpg'
function Preview({open,handleClose,submitHandler,data}) {
    return (
        <div className="modal_container">
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="modal_wrapper"
            >
                <div className="modal_body">
                <div>
                <h2 id="simple-modal-title" style={{textAlign:'center',marginBottom:'10px'}}><u>User Details</u></h2>
                <div id="simple-modal-description" className="modal_desc">
                  <div className="user_details">
                    <table>
                        <tbody>
                            <tr>
                                <td className="table_head">Name</td>
                                <td>{data.Name}</td>
                            </tr>
                            <tr>
                                <td className="table_head">Employee Id</td>
                                <td>{data.Emp_ID}</td>
                            </tr>
                            <tr>
                                <td className="table_head">Organisation Name</td>
                                <td>{data.Org_Name}</td>
                            </tr>
                            <tr>
                                <td className="table_head">Mobile No.</td>
                                <td>{data.Mobile}</td>
                            </tr>
                            <tr>
                                <td className="table_head">Email</td>
                                <td>{data.Email}</td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                  <div className="user_id">
                    <img src ={data.Url} alt=""/>
                  </div>
                  <div style={{display:'flex',justifyContent:'center'}}>
                  <button onClick={submitHandler} type="submit" className="signup_btn">Submit</button>
                  </div>
                </div>
                </div>
                </div>
            </Modal>
        </div>
    )
}

export default Preview
