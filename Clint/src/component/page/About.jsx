import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Page.css'
import { Useauth } from "../../Auth"
function About() {
    const { isLoggedin } = Useauth();
    const navigate = useNavigate();
    const { user } = Useauth();

    const SendHomepage = () => {
        return navigate("/")
    }
    useEffect(() => {
        if (isLoggedin) {
            // console.log("Welocme")
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
            <div style={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {
                    !isLoggedin ?
                        <h2>This is About page</h2>
                        :
                        <>
                            <h2>{`Welcome!  ${user.name} 😊`}</h2>
                        </>

                }
            </div>
        </>
    )
}

export default About;
