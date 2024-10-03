import './Navbar.css';
import {  NavLink } from 'react-router-dom';
import { Useauth } from '../Auth';
import { useEffect, useState } from 'react';
import imagelogo from "./image/imagelogo.png"
const Navbar = () => {
    const { isLoggedin } = Useauth();
    useEffect(() => {

    }, [isLoggedin])

    const [performslider, setPerformslider] = useState({ height: "0px" })

    const Openslide = () => {
        setPerformslider({ height: " 250px" })
    }
    const Closeslide = () => {
        setPerformslider({ height: "0" })
    }
    return (
        <div className="container-navbar-header">
            <div className="container-navcard">
                <div className="logoimageGalerry"><a href="https://www.instagram.com/harshit__7548/"><img src={imagelogo} alt="ImageGallery" /></a></div>
            </div>
            <div className="container-navcard unhide">
                <div><NavLink className="nav-link" to={"/home"}>Home</NavLink></div>
                <div><NavLink className="nav-link" to={"/about"}>About</NavLink></div>
                <div><NavLink className="nav-link" to={"/contact"}>Contact</NavLink></div>
                {
                    isLoggedin ?
                        <div><NavLink className="nav-link" to={"/logout"}>Logout</NavLink></div>
                        :
                        <>
                            <div><NavLink className="nav-link" to={"/Register"}>Register</NavLink></div>
                            <div><NavLink className="nav-link" to={"/login"}>Login</NavLink></div>
                        </>
                }
            </div>
            <div className="container-navcard hidebut">
                <div className="slidenavbar-divcard" onClick={Openslide}>
                    <div className='hide-div'></div>
                    <div className='hide-div'></div>
                    <div className='hide-div'></div>
                </div>
            </div>
            <div className="container-navcard-hide" style={performslider}>
                <h3 className="cancle-hide" onClick={Closeslide}>&#x2715;</h3>
                <div className="hide-nav-link"><NavLink className="nav-link" to={"/home"}>Home</NavLink></div>
                <div className="hide-nav-link"><NavLink className="nav-link" to={"/about"}>About</NavLink></div>
                <div className="hide-nav-link"><NavLink className="nav-link" to={"/contact"}>Contact</NavLink></div>
                {
                    isLoggedin ?
                        <div className="hide-nav-link"><NavLink className="nav-link" to={"/logout"}>Logout</NavLink></div>
                        :
                        <>
                            <div className="hide-nav-link"><NavLink className="nav-link" to={"/Register"}>Register</NavLink></div>
                            <div className="hide-nav-link"><NavLink className="nav-link" to={"/login"}>Login</NavLink></div>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;



