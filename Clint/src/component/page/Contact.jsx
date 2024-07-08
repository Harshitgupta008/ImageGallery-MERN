import { json, useNavigate } from 'react-router-dom'
import Linkdin from "../image/linkedin.png"
import Github from "../image/github.png"
import Instagram from "../image/instagram.png"
import './Page.css'
import { Useauth } from '../../Auth'
import {  useState } from 'react'
function Contact() {
    const [contactData, setContactDate] = useState({
        name: "", number: "", email: "", message: "",
    })

    const navigate = useNavigate();
    const [datacheck,setDatacheck] = useState(true);
    const { user } = Useauth();
    const { isLoggedin } = Useauth();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setContactDate({ ...contactData, [name]: value });
    }

    // for fill detail after login
    if(datacheck && user){
        setContactDate({
            name: user.name, number: user.number, email: user.email, message: "",
        })
        setDatacheck(false)
    }


    // send messages
    const postMessage = async (e)=>{
        e.preventDefault();
        if(isLoggedin){

            const {  name, email, message } = contactData;
            if(!message){
               return window.alert("fill your message")
            }
            try {
                const sendMessage = await fetch("/api/MessageSend",{
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({
                        name, email, message
                    })
                });
                console.log("email are : "+email);
                if(sendMessage.ok){
                    window.alert("Your message was sent successfully");
                    setContactDate({
                        name: user.name, number: user.number, email: user.email, message: "",
                    })
                }else if(sendMessage.status === 400){
                    window.alert("user not found")
                }else{
                    window.alert(`something erro in fetching problem`);
                }
            } catch (error) {
                window.alert(`something erro in fetching problem::Message`);
            }
        }else{
            window.alert("please create your account first")
        }
    }

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
                    <form className='contact_inner_card' onSubmit={postMessage}>
                        {
                            !user
                                ?
                                <div className='contact_inner_card'>
                                    <div className='contact_inner_card2'>

                                        <input type="text" name='name' value={contactData.name} placeholder='Enter Your Name' onChange={inputHandler} />
                                        <input type="number" name='number' value={contactData.number} placeholder='Enter Your Phonenumber' onChange={inputHandler} />
                                    </div>
                                    <input type="email" name='email' value={contactData.email} placeholder='Enter Your Email' onChange={inputHandler} />
                                    <textarea name="message" placeholder='Your Message' value={contactData.message} onChange={inputHandler}></textarea>
                                </div>
                                :
                                <div className='contact_inner_card'>
                                    <div className='contact_inner_card2'>

                                        <input type="text" name='name' value={user.name} placeholder='Enter Your Name' />
                                        <input type="number" name='number' value={user.number} placeholder='Enter Your Phonenumber' />
                                    </div>
                                    <input type="email" name='email' value={user.email} placeholder='Enter Your Email' />
                                    <textarea name="message" placeholder='Your Message' value={contactData.message} onChange={inputHandler}></textarea>
                                </div>
                        }
                        <div className='contact_card2'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact