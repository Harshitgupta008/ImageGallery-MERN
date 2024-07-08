import { createContext, useContext, useEffect, useState } from "react"


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [allMessage,setAllmessage] = useState([])
    const isLoggedin = !!token;
    const GenrateToken = (token) => {;
        return localStorage.setItem("token", token);
    }

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token")
    }

    const UserMessages = async ()=>{
        try {
            const checkUser = await fetch("/api/getallMessage",{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(checkUser.status === 200){
                const data = await checkUser.json();
                setAllmessage(data.msg);
            
                console.log("data "+data.msg)  
            }else{
                console.log("token not found")
            }
        } catch (error) {
            console.log(`error in message get  :: ${error}`)
        }
    }

    // get user contact form
    const UserAuth = async ()=>{
        try {
            const checkUser = await fetch("/api/UserAuth",{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(checkUser.status === 200){
                const data = await checkUser.json();
                setUser([data.userData]);
                // console.log("data "+data.userData)  
            }else{
                console.log("token not found")
            }
        } catch (error) {
            console.log(`error in Userfetching in contact form :: ${error}`)
        }
    }

    useEffect(()=>{
        UserAuth();
        UserMessages();
    },[]);

    return <AuthContext.Provider value={{ GenrateToken, LogoutUser, isLoggedin, user, allMessage }}>
        {children}
    </AuthContext.Provider>
}

export const Useauth = () => {
    return useContext(AuthContext);
}








