import { useNavigate } from "react-router-dom";
import Backicon from "../../image/backbutton.png"
import defaultDpimage from "../../image/defaultDpimage.png"
import { Useauth } from '../../../Auth';
import './Profile.css'
import {  useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditProfile_container = () => {
    const nevigate = useNavigate();
    const { user } = Useauth();
    const [userData,setUserData] = useState({
        name:user.name, place:user.place, number:user.number
    })
    const BackRout = () => {
        return nevigate("/about")
    }
    const editImage = () => {
        return window.alert("Error#$%image%#$Update")
    }

    const handleInput = (e)=>{
        const {name, value} = e.target;
        setUserData({...userData,[name]:value});
    }
    const SubmitAndSave = async(e)=>{
        e.preventDefault();
        if(!userData.name || !user.email || !userData.place || !userData.number){
            return toast.warn("all field are mendetory")
        }
        try {
            const response = await fetch("/api/updateuser",{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name:userData.name, email:user.email, place:userData.place, number:userData.number
                })
            })
            if(response.ok){
                setUserData({
                    name:"", place:"", number:""
                })
                toast.success("Update your data")
                return nevigate("/profile")
            }else{
                return toast.error("error in data@#$%^")
            }
            
        } catch (error) {
            console.log(`registeration error on fetching :: ${error}`)
        }
    }
    return (
        <>
            <div className="container_profile">
                <div className="profile_card">
                    <div className='profile_backicon'>
                        <img onClick={BackRout} src={Backicon} alt="Back" />
                    </div>
                    <div className="editprofile_container">
                        <img src={defaultDpimage} onClick={editImage} alt="Profile" className="profile-image image_editprofile_container" />
                        <form className="editform">
                            <div className="input_form">
                                <label htmlFor="email">Email</label>
                                <input type="email"  name="email" id="email" value={user.email} placeholder="Edit Your Email" readOnly />
                            </div>
                            <div className="input_form">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" value={userData.name} onChange={handleInput} placeholder="Edit Your Name" />
                            </div>
                            <div className="input_form">
                                <label htmlFor="place">Place</label>
                                <input type="text" name="place" id="place" value={userData.place} onChange={handleInput} placeholder="Edit Your place" />
                            </div>
                            <div className="input_form">
                                <label htmlFor="number">Phone-Number</label>
                                <input type="number" name="number" id="number" value={userData.number} onChange={handleInput} placeholder="Edit Your Number" />
                            </div>
                            <div className="input_form_but">
                                <button onClick={SubmitAndSave}>Save</button>
                            </div>
                            
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProfile_container;