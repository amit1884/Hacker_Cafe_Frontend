import React, { Component } from 'react'
import Carousel from '../components/Carousel'
import '../assets/styles/style.css'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
class Home extends Component {
    render() {
        return (
            <div>
                <Carousel/>
                <div className="menu_button_container" style={{overflowX:'hidden'}}>
                    <div className="menu_button" id="menu" >
                        <p>Menu</p>
                    </div>
                </div>
                <br/>
                <br/>
                <div style={{display:'flex',justifyContent:'center'}} >
                    <Menu/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Home

