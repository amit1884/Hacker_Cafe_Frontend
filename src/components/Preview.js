import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
function Preview({open,handleClose,submitHandler}) {
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
                <h2 id="simple-modal-title">Text in a modal</h2>
                <p id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                </div>
            </Modal>
        </div>
    )
}

export default Preview
