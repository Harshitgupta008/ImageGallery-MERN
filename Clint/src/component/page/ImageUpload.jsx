import { useEffect, useState } from "react";
import { Useauth } from "../../Auth";
const ImageUpload = ({ imageposition }) => {
    const [imgfile, setImgfile] = useState(null);
    const [backgroundChange, setBackgroundChange] = useState({ backgroundColor: "white", color: "#8224E3" })
    const { token } = Useauth();
    const Close_page = () => {
        imageposition(false)
    }
    const senddata = async (e) => {
        e.preventDefault();
        if(!imgfile){
            return window.alert("fill image")
        }
        const formData = new FormData();
        formData.append('image', imgfile);
        try {

            const send = await fetch('/api/imageUpload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (send.status === 200) {
                window.alert("file uploaded")
                setImgfile("");
            } else {
                window.alert("some problem file not uploaded")
            }
        } catch (error) {
            console.log("find error :: " + error)
        }
    }

    const handleMouseDown = () => {
        setBackgroundChange({ backgroundColor: "#8224E3", color: "white" }); // Change color on mouse down
    };

    const handleMouseUp = () => {
        setBackgroundChange({ backgroundColor: "white", color: "#8224E3" }); // Revert to original color on mouse up
    };


    useEffect(() => {

    }, [imgfile])
    return (

        <div className="aboutImage_container">
            <div className="about_imagebanner">
                <h2 onClick={Close_page} className="about_canclebaner">&#x2715;</h2>
                <h3 className="note_imagebanner">Wait 5 second after post</h3>
                <div className="image_bannerdetail">
                    
                    <img src={imgfile ? URL.createObjectURL(imgfile) : ''} className="image_bannerdetail" alt="" />
                </div>
                <form encType="multipart/form-data" className="form_imagebanner">
                    <label htmlFor="imageupload_about">Choose file</label>
                    <input type="file" name="image" accept="image/*" id="imageupload_about" onChange={(e) => { setImgfile(e.target.files[0]) }} />
                    <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} style={backgroundChange} onClick={senddata}>Save</button>
                </form>
            </div>
        </div>
    )
}
export default ImageUpload;