import { useEffect } from 'react'
import '../Navbar.css'
import { useNavigate } from 'react-router-dom';
import { Useauth } from '../../Auth';


function Login() {
    const { GenrateToken } = Useauth();
    const navigate = useNavigate();
    const NoAccount = () => {
        return navigate("/register")
    }
    const CreateToken = () => {
        GenrateToken();
        navigate("/home");
        window.location.reload()
    }
    useEffect(() => {

    }, [GenrateToken])

    return (
        <>
            <div className="container_login">
                <div className="login_card">
                    <h1>Login Here</h1>
                    <div className="line-login"></div>
                    <form className="login_form">

                        <input type="email" name="email" placeholder="Enter Your Email" />
                        <input type="text" name="password" placeholder="Enter Your Password" />
                        <div className="login_forget">
                            <h5 onClick={NoAccount}>Don't have any account</h5>
                            <h5>Forget password ?</h5>
                        </div>
                        <div className="login_card2">
                            <button onClick={CreateToken}>Login 😊</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login