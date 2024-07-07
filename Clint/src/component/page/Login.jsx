import { useEffect, useState } from 'react'
import '../Navbar.css'
import { useNavigate } from 'react-router-dom';
import { Useauth } from '../../Auth';


function Login() {
    const { GenrateToken } = Useauth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const NoAccount = () => {
        return navigate("/register")
    }

    // login user 
    const Logindata = async (e)=>{
        e.preventDefault();

        if(!email || !password){
            window.alert("All field are mendatry");
        }
        try {
            const logingData = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                     email,  password
                })
            });
            if(logingData.status === 200){
                const userToken = await logingData.json();
                GenrateToken(userToken.token);
                // console.log(userToken.token)
                window.alert(`login Successfluly`)
                navigate("/home")
                window.location.reload()
            }else if(logingData.status === 400){
                window.alert(`User not found`);
            }else{
                window.alert(`something erro in fetching problem`);

            }
        } catch (error) {
            window.alert(`something erro in fetching problem`);
        }
    }



    useEffect(() => {

    }, [GenrateToken])

    return (
        <>
            <div className="container_login">
                <div className="login_card">
                    <h1>Login Here</h1>
                    <div className="line-login"></div>
                    <form className="login_form" onSubmit={Logindata}>

                        <input type="email" name="email" placeholder="Enter Your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input type="password" name="password" placeholder="Enter Your Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <div className="login_forget">
                            <h5 onClick={NoAccount}>Don't have any account</h5>
                            <h5>Forget password ?</h5>
                        </div>
                        <div className="login_card2">
                            <button type='submit'>Login 😊</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login