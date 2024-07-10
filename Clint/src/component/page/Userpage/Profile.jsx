import './Profile.css'
import Backicon from "../../image/backbutton.png"
import { useNavigate } from 'react-router-dom';
function Profile() {
    const nevigate = useNavigate();
    const BackRout = () => {
        nevigate(-1);
    }
    return (
        <>
            <div className="container_profile">
                <div className="profile_card">
                    <div className='profile_backicon'>
                        <img onClick={BackRout} src={Backicon} alt="Back" />
                    </div>
                    <h1>Hello this is profile page</h1>
                </div>
            </div>
        </>
    )
}

export default Profile;