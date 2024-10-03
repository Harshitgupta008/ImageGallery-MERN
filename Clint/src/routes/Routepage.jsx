import Home from "../component/page/Home.jsx"
import About from "../component/page/About.jsx"
import Login from "../component/page/Login.jsx"
import Register from "../component/page/Register.jsx"
import Logout from "../component/page/Logout.jsx"
import Contact from "../component/page/Contact.jsx"
import ErrorPage from "../component/page/ErrorPage.jsx"
import { Routes, Route } from "react-router-dom"
import { Useauth } from "../Auth.jsx"
import Profile from "../component/page/Userpage/Profile.jsx"
import EditProfile from "../component/page/Userpage/EditProfile.jsx"
function Routepage() {
    const { isLoggedin } = Useauth();
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {
                    isLoggedin ?
                        <>
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/editprofile" element={<EditProfile />} />
                        </>
                        :
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                }
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default Routepage