import './Navbar.css';
import { Link } from 'react-router-dom';
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
                <div className="logoimageGalerry"><img src={imagelogo} alt="ImageGallery" /></div>
            </div>
            <div className="container-navcard unhide">
                <div><Link className="nav-link" to={"/home"}>Home</Link></div>
                <div><Link className="nav-link" to={"/about"}>About</Link></div>
                <div><Link className="nav-link" to={"/contact"}>Contact</Link></div>
                {
                    isLoggedin ?
                        <div><Link className="nav-link" to={"/logout"}>Logout</Link></div>
                        :
                        <>
                            <div><Link className="nav-link" to={"/Register"}>Register</Link></div>
                            <div><Link className="nav-link" to={"/login"}>Login</Link></div>
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
                <div className="hide-nav-link"><Link className="nav-link" to={"/home"}>Home</Link></div>
                <div className="hide-nav-link"><Link className="nav-link" to={"/about"}>About</Link></div>
                {
                    isLoggedin ?
                        <div className="hide-nav-link"><Link className="nav-link" to={"/logout"}>Logout</Link></div>
                        :
                        <>
                            <div className="hide-nav-link"><Link className="nav-link" to={"/Register"}>Register</Link></div>
                            <div className="hide-nav-link"><Link className="nav-link" to={"/login"}>Login</Link></div>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;



