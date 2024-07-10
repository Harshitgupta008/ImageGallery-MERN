import "./Post.css"
import harshit from "../../image/harshit.jpg"
import { Useauth } from "../../../Auth";
function Post() {
    const { allImages } = Useauth();
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
                                    <div key={i} className="imagecard_post">
                                        <img src={ele.image} alt="user_post" />
                                    </div>
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