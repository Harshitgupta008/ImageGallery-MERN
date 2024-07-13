import './Page.css'
import "./Userpage/Post.css";
import { Useauth } from "../../Auth";
import { useEffect } from 'react';
function Home() {
    const { allImages } = Useauth();
    const { isLoggedin } = Useauth();
    useEffect(() => {

    }, [isLoggedin])
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
                                                    <img src={ele.image} alt="user_post" />
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

