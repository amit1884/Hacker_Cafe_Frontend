import React from 'react'
import img1 from '../assets/images/fast.png'
import img2 from '../assets/images/online.png'
import img3 from '../assets/images/tasty.png'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
function Footer() {
    return (
        <div className="footer_container">
            <div className="features_wrapper">
                <div className="features">
                    <img src ={img1} alt=""/>&nbsp;&nbsp;
                    <p>Fast Delivery</p>
                </div>
                <div className="features">
                <img src ={img2} alt=""/>&nbsp;&nbsp;
                <p>Online Payment</p>
                </div>
                <div className="features">
                <img src ={img3} alt=""/>&nbsp;&nbsp;
                <p>Tasty & Nutritious</p>
                </div>
            </div>
            <div className="heading">   
                <h1>Hacker Cafe</h1>
            </div>
            <div className="social_contacts">
                <div>
                <FacebookIcon/>&nbsp;&nbsp;&nbsp;&nbsp;
                <TwitterIcon/>&nbsp;&nbsp;&nbsp;&nbsp;
                <InstagramIcon/>&nbsp;&nbsp;
                </div>
                <div>
                    <p>All rights reserved  &#xa9; www.hackercafe.com</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
