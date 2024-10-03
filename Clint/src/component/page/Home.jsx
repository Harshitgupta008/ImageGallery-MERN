import './Page.css'
import "./Userpage/Post.css";
import { Useauth } from "../../Auth";
import { useEffect, useState } from 'react';

function Home() {
    const { token } = Useauth();
    const { isLoggedin } = Useauth();
    const [allImages, setAllImages] = useState([])
    const UserImages = async () => {
        try {
            const checkUser = await fetch("/api/Getimages", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (checkUser.status === 200) {
                const data = await checkUser.json();
                setAllImages(data.msg);
            } else {
                console.log("token not found")
            }
        } catch (error) {
            console.log(`error in message get  :: ${error}`)
        }
    }
    useEffect(() => {
        UserImages();
    }, [isLoggedin,allImages])
    return (
        <>
            <div className='container1_banner_allpage'>
                <h2 className='banner_text3'>Home</h2>
            </div>
            {
                isLoggedin ?
                    <div className="container_post">
                        <div className="post_card">
                            <div className="allImages_post">
                                {
                                    allImages.map((ele, i) => {
                                        return (
                                            <>
                                                <div key={i} className="imagecard_post">
                                                    <img className='user_post' src={ele.image} alt="user_post" />
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexDirection: "column" }}>
                        <h1>Login and enjoy image gallery</h1>
                        <h3 style={{color: "red"}}>Owner - Harshit gupta</h3>
                    </div>
            }
        </>
    )
}

export default Home;

