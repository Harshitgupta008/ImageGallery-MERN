import '../Navbar.css'
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Useauth } from '../../Auth';


function Logout() {
    const {LogoutUser} = Useauth();
    const navigate = useNavigate();
    const RemoveToken = () => {
        LogoutUser();
        navigate("/login")

    }

    useEffect(() => {

    }, [LogoutUser])


    return (
        <>
            <div style={{ height: "80vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexDirection: "column" }}>

                <h2>This is Logout page</h2>
                <button onClick={RemoveToken}>
                    Logout 😣
                </button>
            </div>
        </>
    )

}

export default Logout