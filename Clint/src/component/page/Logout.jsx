import '../Navbar.css'
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Useauth } from '../../Auth';
import './Page.css'

function Logout() {
    const navigate = useNavigate();
    const { LogoutUser } = Useauth();


    const SendHomepage = () => {
        return navigate("/")
    }
    const RemoveToken = () => {
        LogoutUser();
        navigate("/login")

    }

    useEffect(() => {

    }, [LogoutUser])


    return (
        <>
            <div className='container1_banner_allpage'>
                <h3 className='banner_text1' onClick={SendHomepage}>Home</h3>
                <h3>{` > `}</h3>
                <h2 className='banner_text3'>Logout</h2>
            </div>
            <div style={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexDirection: "column" }}>
                <h2>Thanks for use this, See you later</h2>
                <button onClick={RemoveToken}>
                    Logout 😣
                </button>
            </div>
        </>
    )

}

export default Logout;




