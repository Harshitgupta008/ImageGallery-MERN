import './Page.css'
import './About.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultimage from "../image/defaultDpimage.png"
import plusicon from "../image/addPlusimage.jpg"
import { Useauth } from "../../Auth"
import Post from './Userpage/Post';
function About() {
    const { isLoggedin } = Useauth();
    const navigate = useNavigate();
    const { user } = Useauth();

    const SendHomepage = () => {
        return navigate("/")
    }
    const ProfileRoute = ()=>{
        return navigate("/profile")
    }
    useEffect(() => {
        if (isLoggedin) {
            // console.log("welcome ")
        } else {
            window.alert("You can not see About page without login")
            return navigate("/login")
        }
    }, [isLoggedin, navigate])



    return (
        <>
            <div className='container1_banner_allpage'>
                <h3 className='banner_text1' onClick={SendHomepage}>Home</h3>
                <h3>{` > `}</h3>
                <h2 className='banner_text3'>About</h2>
            </div>
            {
                user ?
                    <>
                        <div className="container_about">
                            <div className="about_card">
                                <div className='profile_imagecard_about'>
                                    <div className="about_defaultimage">
                                        <img src={defaultimage} alt="" className='profileimage_about' />
                                        <img src={plusicon} alt="" className='plusicon_about' />
                                    </div>
                                    <h4 className='h3aboutprofile'>{user.name}</h4>
                                    <div className='about_profilebutton'>
                                        <button >Edit Profile</button>
                                        <button onClick={ProfileRoute}>Views Profile</button>
                                        
                                    </div>
                                </div>
                                <div className='profile_imagecard_about2'>
                                    <div className='about_postcard'>
                                        <h2>Post</h2>
                                        <h2>0</h2>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Post />
                    </>

                    :
                    <div style={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexDirection: "column" }}>
                        <h2>404 error User not found</h2>
                    </div>
            }
        </>
    )
}

export default About;
