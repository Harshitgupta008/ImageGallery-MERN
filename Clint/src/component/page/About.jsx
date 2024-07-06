
import { useEffect } from "react";
import { Useauth } from "../../Auth"
import { useNavigate } from "react-router-dom";
function About() {
    const { isLoggedin } = Useauth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLoggedin){
            console.log("Welocme")
        }else{
            window.alert("You can not see About page without login")
           return  navigate("/login")
        }
    },[isLoggedin,navigate])
    return (
        <>
            <div style={{ height: "80vh", width: "100%", display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h2>This is About page</h2>
            </div>
        </>
    )
}

export default About