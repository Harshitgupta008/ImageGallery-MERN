import { createContext, useContext, useEffect, useState } from "react"


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [allMessage, setAllmessage] = useState([])
    const isLoggedin = !!token;

    // genrate tokne in localStorage from login page
    const GenrateToken = (token) => {
        setToken(token);
        return localStorage.setItem("token", token);
    }

    //remove token from localstorage in logout page
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token")
    }

    // get all messages in contact page
    const UserMessages = async () => {
        try {
            const checkUser = await fetch("/api/getallMessage", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (checkUser.status === 200) {
                const data = await checkUser.json();
                setAllmessage(data.msg); 
            } else {
                console.log("token not found")
            }
        } catch (error) {
            console.log(`error in message get  :: ${error}`)
        }
    }


    // delete messagees from contact form
    const UserDeleteMessage = async (id) => {
        try {
            const checkUser = await fetch(`/api/checkmessage/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
            });
            if (checkUser.status === 200) {
                // console.log("checkUser "+data.msg)  
            } else {
                console.log("token not found")
            }
        } catch (error) {
            console.log(`error in message get  :: ${error}`)
        }
    }

    // get user contact form
    const UserAuth = async () => {
        try {
            const checkUser = await fetch("/api/UserAuth", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (checkUser.status === 200) {
                const data = await checkUser.json();
                setUser(data.userData);
                // console.log("data "+data.userData)  
            } else {
                console.log("token not found")
            }
        } catch (error) {
            console.log(`error in Userfetching in contact form :: ${error}`)
        }
    }

    useEffect(() => {
        UserAuth();
        UserMessages();
    }, [allMessage]);

    return <AuthContext.Provider value={{ GenrateToken, LogoutUser, isLoggedin, user, allMessage, UserDeleteMessage }}>
        {children}
    </AuthContext.Provider>
}

export const Useauth = () => {
    return useContext(AuthContext);
}








