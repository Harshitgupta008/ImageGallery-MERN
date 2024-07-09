import "./Post.css"
import harshit from "../../image/harshit.jpg"
function Post() {
    return (
        <>
            <div className="postdiv_button">
                <button><b>+</b> New Post</button>
            </div>
            <div className="container_post">
                <div className="post_card">
                    <div>
                        <h2>All Post</h2>
                    </div>
                    <div className="allImages_post">
                        <div className="imagecard_post">
                            <img src={harshit} alt="" />
                        </div>
                        <div className="imagecard_post">
                            <img src={harshit} alt="" />
                        </div>
                        <div className="imagecard_post">
                            <img src={harshit} alt="" />
                        </div>
                        <div className="imagecard_post">
                            <img src={harshit} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;