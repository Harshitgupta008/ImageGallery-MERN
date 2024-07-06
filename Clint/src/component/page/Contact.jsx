import { useNavigate } from 'react-router-dom'
import Linkdin from "../image/linkedin.png"
import Github from "../image/github.png"
import Instagram from "../image/instagram.png"
import './Page.css'
function Contact() {
    const navigate = useNavigate();
    const SendHomepage = () => {
        return navigate("/")
    }
    return (
        <>
            <div className='container1_banner_allpage'>
                <h3 className='banner_text1' onClick={SendHomepage}>Home</h3>
                <h3>{` > `}</h3>
                <h2 className='banner_text3'>Contact</h2>
            </div>
            <div className='container_contact'>
                <div className='contact_card'>
                    <h1>Contact Me! 😊</h1>
                    <div className='contact_image'>
                        <a href="https://www.linkedin.com/in/harshit-gupta-667545235/"><img src={Linkdin} alt="insta" /></a>
                        <a href="https://www.instagram.com/harshit__7548/"><img src={Instagram} alt="linkedin" /></a>
                        <a href="https://github.com/Harshit0032"><img src={Github} alt="git" /></a>
                    </div>
                    <div className='contact_inner_card'>
                        <div className='contact_inner_card2'>

                            <input type="text" name='name' placeholder='Enter Your Name' />
                            <input type="number" name='number' placeholder='Enter Your Phonenumber' />
                        </div>
                        <input type="email" name='email' placeholder='Enter Your Email' />
                        <textarea name="text" placeholder='Your Message'></textarea>
                    </div>
                    <div className='contact_card2'>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact