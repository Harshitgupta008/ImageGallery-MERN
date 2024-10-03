import './Profile.css'
import Backicon from "../../image/backbutton.png"
import defaultDpimage from "../../image/defaultDpimage.png"
import { useNavigate } from 'react-router-dom';
import { Useauth } from '../../../Auth';
function Profile() {
    const nevigate = useNavigate();
    const { user } = Useauth();
    const BackRout = () => {
        return nevigate("/about")
    }
    return (
        <>
            <div className="container_profile">
                <div className="profile_card">
                    <div className='profile_backicon'>
                        <img onClick={BackRout} src={Backicon} alt="Back" />
                    </div>
                    <div className="profile-card">
                        <img src={defaultDpimage} alt="Profile" className="profile-image" />
                        <h2 className="profile-name">{user.name}</h2>
                        <div className="profile-place"> <h3>Place</h3> <h5>{user.place}</h5> </div>
                        <div className="profile-email"> <h3>Email</h3> <h5>{user.email}</h5></div>
                        <div className="profile-phone"> <h3>Number</h3> <h5>{user.number}</h5></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;