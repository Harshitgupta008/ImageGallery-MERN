import { useEffect } from "react";
import { Useauth } from "../../Auth"
import { useNavigate } from "react-router-dom";
import './Page.css'
function About() {
    const { isLoggedin } = Useauth();
    const navigate = useNavigate();
    const SendHomepage = () => {
        return navigate("/")
    }
    useEffect(() => {
        if (isLoggedin) {
            console.log("Welocme")
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
            <div style={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    !isLoggedin ?
                    <h2>This is About page</h2>
                    :
                    <h2>Welcom! </h2>

                }
            </div>
        </>
    )
}

export default About;
