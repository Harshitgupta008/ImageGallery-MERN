import { createContext, useContext, useState } from "react"


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const isLoggedin = !!token;
    const GenrateToken = (token) => {;
        return localStorage.setItem("token", token);
    }

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token")
    }

    return <AuthContext.Provider value={{ GenrateToken, LogoutUser, isLoggedin }}>
        {children}
    </AuthContext.Provider>
}

export const Useauth = () => {
    return useContext(AuthContext);
}








