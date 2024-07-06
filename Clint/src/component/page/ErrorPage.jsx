import { useNavigate } from 'react-router-dom'
import './Page.css'
function ErrorPage() {
    const navigate = useNavigate();
    const SendHomepage = () => {
        return navigate("/")
    }
    return (
        <>
            <div className='container1_banner_allpage'>
                <h3 className='banner_text1' onClick={SendHomepage}>Home</h3>
                <h3>{` > `}</h3>
                <h2 className='banner_text3'>Error 404</h2>
            </div>
            <div style={{ height: "80vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1>404</h1><h2>: Page not found</h2>
            </div>
        </>
    )
}

export default ErrorPage;