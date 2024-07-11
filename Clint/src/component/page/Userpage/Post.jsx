import "./Post.css"
import { Useauth } from "../../../Auth";
import { useEffect, useState } from "react";
function Post() {
    const { allImages } = Useauth();
    const { UserDeleteImages } = Useauth();
    const [backgroundChange, setBackgroundChange] = useState({ backgroundColor: "white", color: "#8224E3" })
    const handleMouseDown = (id) => {
        setBackgroundChange((prev) => ({
            ...prev,
            [id]: { backgroundColor: "#8224E3", color: "white" },
        }));
    };

    const handleMouseUp = (id) => {
        setBackgroundChange((prev) => ({
            ...prev,
            [id]: { backgroundColor: "white", color: "#8224E3" },
        }));
    };
    useEffect(()=>{
        UserDeleteImages();
    },[allImages])
    return (
        <>

            <div className="container_post">
                <div className="post_card">
                    <div>
                        <h2>All Post</h2>
                    </div>
                    <div className="allImages_post">
                        {
                            allImages.map((ele, i) => {
                                return (
                                    <>
                                        <div key={i} className="imagecard_post">
                                            <img src={ele.image} alt="user_post" />
                                            <button onMouseDown={() => handleMouseDown(ele.id)} onMouseUp={() => handleMouseUp(ele.id)} 
                                            style={backgroundChange[ele.id]} onClick={() => UserDeleteImages(ele.id, ele.image)} className="post_button">Delete Post</button>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;