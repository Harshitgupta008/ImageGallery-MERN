import { useEffect } from 'react'
import '../Navbar.css'
import { useNavigate } from 'react-router-dom';
import { Useauth } from '../../Auth'; 


function Login() {
    const { GenrateToken } = Useauth();
    const navigate = useNavigate();
    const  CreateToken = ()=>{
        GenrateToken();
        navigate("/home");
        window.location.reload()
    }
    useEffect(()=>{
        
    },[GenrateToken])

    return (
        <>
            <div style={{ height: "80vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexDirection: "column" }}>

                <h2>This is Login page</h2>
                <button onClick={CreateToken}>
                    Login 😊
                </button>
            </div>
        </>
    )
}

export default Login