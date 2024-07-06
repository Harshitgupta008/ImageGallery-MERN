import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate();
    const HaveAccount = ()=>{
        return navigate("/login")
    }
    return (
        <>
            <div className="container_register">
                <div className="register_card">
                    <h1>Register Here</h1>
                    <div className="line-register"></div>
                    <form className="register_form">
                        <input type="text" name="name" placeholder="Enter Your Name" />
                        <input type="email" name="email" placeholder="Enter Your Email" />
                        <input type="number" name="number" placeholder="Enter Your PhoneNumber" />
                        <input type="text" name="place" placeholder="Enter Your Location" />
                        <input type="text" name="password" placeholder="Enter Your Password" />
                        <input type="text" name="confirmpassword" placeholder="Enter Your Confirm Password" />
                        <div className="register_forget">
                            <h5 onClick={HaveAccount}>Already have a account</h5>
                        </div>
                        <div className="register_card2">
                            <button>Register 🎉</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register