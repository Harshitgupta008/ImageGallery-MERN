import "./Post.css"
import { Useauth } from "../../../Auth";
import { useEffect, useState } from "react";
import downloadicon from "../../image/downloadbut.png"
import deletepost from "../../image/bin.png"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Post() {
    const [allImages, setAllImages] = useState([])
    const { token } = Useauth();


    // get all images
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

    // delete image from user
    const DeleteImage = async (id, image) => {
        try {
            const checkUser = await fetch(`/api/Deleteimages/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({ imageURL: image })
            });
            if (checkUser.status === 200) {
                // console.log("checkUser "+data.msg)  
            } else {
                console.log("token not found")
            }
        } catch (error) {
            console.log(`error in message get  :: ${error}`)
        }
        toast.success("Image Deleted")
    }
    useEffect(() => {
        UserImages();
    }, [allImages])
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
                                            <img className="user_post" src={ele.image} alt="user_post" />
                                            <div className="handle_but">
                                                <button onClick={() => DeleteImage(ele.id, ele.image)} className="post_button delete_post">
                                                    <img className='downloadicon_post' src={deletepost} alt="" />
                                                </button>
                                                <button onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = ele.image;
                                                    link.download = 'image';
                                                    link.click();
                                                }}
                                                    className="post_button download_post">
                                                    <img className='downloadicon_post' src={downloadicon} alt="" />
                                                </button>
                                            </div>
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