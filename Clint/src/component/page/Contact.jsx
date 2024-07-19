import Linkdin from "../image/linkedin.png"
import Github from "../image/github.png"
import Instagram from "../image/instagram.png"
import imageicon from "../image/imagesicon.jpg"
import deleteicon from "../image/bin.png"
import { useNavigate } from 'react-router-dom'
import './Page.css'
import { Useauth } from '../../Auth'
import {  useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Contact() {
    const [contactData, setContactDate] = useState({
        name: "", number: "", email: "", message: "",
    })
    const [messageCard, setMessageCard] = useState({ display: "none" })

    const navigate = useNavigate();
    const [datacheck, setDatacheck] = useState(true);
    const { user } = Useauth();
    const { isLoggedin } = Useauth();
    const { UserDeleteMessage } = Useauth();

    // get all message from here 
    const { allMessage } = Useauth();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setContactDate({ ...contactData, [name]: value });
    }

    // for fill detail after login
    if (datacheck && user) {
        setContactDate({
            name: user.name, number: user.number, email: user.email, message: "",
        })
        setDatacheck(false)
    }


    // send messages
    const postMessage = async (e) => {
        e.preventDefault();
        if (isLoggedin) {

            const { name, email, message } = contactData;
            if (!message) {
                return toast.warn("fill your message")
            }
            try {
                const sendMessage = await fetch("/api/MessageSend", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name, email, message
                    })
                });
                console.log("email are : " + email);
                if (sendMessage.ok) {
                    toast.success("Message Sent Successfully");
                    setContactDate({
                        name: user.name, number: user.number, email: user.email, message: "",
                    })
                } else if (sendMessage.status === 400) {
                    toast("user not found")
                } else {
                    toast(`something erro in fetching problem`);
                }
            } catch (error) {
                window.alert(`something erro in fetching problem::Message`);
            }
        } else {
            toast.error("please create your account first")
        }
    }

    const DeleteMessage = (id)=>{
        UserDeleteMessage(id);
        toast.success("Message Deleted ")
    }

    const SendHomepage = () => {
        return navigate("/")
    }

    const CloseMessageCard = () => {
        setMessageCard({ display: "none" })
    }
    const OpenMessageCard = () => {
        setMessageCard({ display: "flex" })
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
                    <div className='imageicon'>
                        <img onClick={OpenMessageCard} src={imageicon} alt="messages" />
                    </div>
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

                    {/* contact message page start  */}
                    {
                        user ?


                            <div style={messageCard} className='Whole_message_Div'>
                                <div className="contact-cancle">
                                    <h2>Messages</h2>
                                    <h3 onClick={CloseMessageCard} className="cancle-hide-banner">&#x2715;</h3>
                                    <div className="container-contact-banner">
                                        {
                                            allMessage.map((ele, i) => {
                                                return (
                                                    <>
                                                        <div className="contact-banner1" key={i}>
                                                            <div className='contact_banner1_deleteicon'>
                                                                <img onClick={()=>DeleteMessage(ele.id)} src={deleteicon} alt="messages" />
                                                            </div>
                                                            <h4>{ele.message}</h4>
                                                            <div className="contact-date">
                                                                <p>{ele.date.slice(2, 10)}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                            </>
                    }
                    {/* contact message page end  */}

                </div>
            </div>
        </>
    )
}

export default Contact