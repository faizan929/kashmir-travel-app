
import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import {useAuth} from "../context/useAuth"
import { useLocation } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const { user, loading, setShowLogin, setRedirectedPath} = useAuth();
    const location = useLocation();

  
    useEffect(() => {
        if (loading) return ;
        if(!user){
            setRedirectedPath(location.pathname)
            setShowLogin(true)
        }
    }, [user,loading, location.pathname, setRedirectedPath, setShowLogin]);
    if (loading) return <div className = "spinner">Loading...</div>
    if (!user) return <p> Please log in to view your bookings.</p>;
    
    return children;
}

export default ProtectedRoute;



