import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", number: "", place: "", password: "", cpassword: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    // register userdata
    const postData = async (e) => {
        e.preventDefault();
        const { name, email, number, place, password, cpassword } = user;
        if (!name || !email || !number || !place || !password || !cpassword) {
            return toast.warn("All field are mendatry");
        }
        if (password !== cpassword) {
            toast.error("Password mismatch");
        }
        try {
            const sendData = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, number, place, password, cpassword
                })
            });
            if (sendData.status === 200) {
                toast.success(`Registeration Successfluly`)
                navigate("/login")
            } else if (sendData.status === 400) {
                toast.warn(`data already exist`);
            } else {
                window.alert(`something erro in fetching problem`);

            }
        } catch (error) {
            console.log(`registeration error on fetching :: ${error}`)
        }

    }

    const HaveAccount = () => {
        return navigate("/login")
    }

    return (
        <>
            <div className="container_register">
                <div className="register_card">
                    <h1>Register Here</h1>
                    <div className="line-register"></div>
                    <form className="register_form" onSubmit={postData}>
                        <input type="text" name="name" value={user.name} placeholder="Enter Your Name" onChange={handleInput} />
                        <input type="email" name="email" value={user.email} placeholder="Enter Your Email" onChange={handleInput} />
                        <input type="number" name="number" value={user.number} placeholder="Enter Your PhoneNumber" onChange={handleInput} />
                        <input type="text" name="place" value={user.place} placeholder="Enter Your Location" onChange={handleInput} />
                        <input type="password" name="password" value={user.password} placeholder="Enter Your Password" onChange={handleInput} />
                        <input type="password" name="cpassword" value={user.cpassword} placeholder="Enter Your Confirm Password" onChange={handleInput} />
                        <div className="register_forget">
                            <h5 onClick={HaveAccount}>Already have a account</h5>
                        </div>
                        <div className="register_card2">
                            <button type="submit">Register 🎉</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register