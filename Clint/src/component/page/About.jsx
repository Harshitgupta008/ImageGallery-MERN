import './Page.css'
import './About.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultimage from "../image/defaultDpimage.png"
import plusicon from "../image/addPlusimage.jpg"
import { Useauth } from "../../Auth"
import Post from './Userpage/Post';
import ImageUpload from './ImageUpload.jsx';
function About() {
    const { isLoggedin } = Useauth();
    const navigate = useNavigate();
    const { user } = Useauth();
    const { allImages } = Useauth();
    

    const [imagepage, setImagepage] = useState(false);

    const SendHomepage = () => {
        return navigate("/")
    }
    const ProfileRoute = () => {
        return navigate("/profile")
    }

    const ShowImage_Page = () => {
        setImagepage(true);
    }
    useEffect(() => {
        if (isLoggedin) {
            // console.log("welcome ")
        } else {
            window.alert("You can not see About page without login")
            return navigate("/login")
        }
    }, [isLoggedin, navigate, imagepage])



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
                                        <h2>{allImages.length}</h2>
                                    </div>
                                </div>

                            </div>
                            {
                                !imagepage ?
                                    <></>
                                    :
                                    <ImageUpload imageposition={setImagepage} />
                            }

                        </div>

                        <div className="postdiv_button">
                            <button onClick={ShowImage_Page}><b>+</b> New Post</button>
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
