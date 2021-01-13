import React from 'react'
import Slider from "react-slick";
import '../assets/styles/carouselStyle.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/images/bg_1.jpg'
import img2 from '../assets/images/bg_2.jpg'
import img3 from '../assets/images/bg_3.jpg'
function Carousel() {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
      };
    return (
        <Slider {...settings} style={{overflow:'hidden'}}>
                <div className="banner_image">
                    <img src ={img1} alt=""/>
                    <div className="banner_text">
                        <div className="inner_text_area">
                        <h1 className=" animate__animated animate__fadeInDown">Hacker Cafe</h1>
                        <p className="animate__animated animate__fadeInUp">Best Office Cafeteria</p>
                        </div>
                    </div>
                </div>
                <div className="banner_image">
                    <img src ={img2} alt=""/>
                    <div className="banner_text">
                        <div className="inner_text_area">
                        <h1 className=" animate__animated animate__fadeInDown">Hacker Cafe</h1>
                        <p className="animate__animated animate__fadeInUp">Nutritious & Tasty</p>
                        </div>
                    </div>
                </div>
                <div className="banner_image">
                    <img src ={img3} alt=""/>
                    <div className="banner_text">
                        <div className="inner_text_area">
                        <h1 className=" animate__animated animate__fadeInDown">Hacker Cafe</h1>
                        <p className="animate__animated animate__fadeInUp">Delicious Specialities</p>
                        </div>
                    </div>
                </div>
        </Slider>
    )
}

export default Carousel
