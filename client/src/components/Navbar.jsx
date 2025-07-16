
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

import "./Navbar.css";


function Navbar({setShowLogin}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
               }
    }, []);

    return ( 
        <nav className="navbar">
            <div className="navbar-left">
                <h2 className="logo">
                    <Link to="/" className="logo-link">SafarKashmir</Link>
                </h2>
                <span className="tagline">Assi ti Lassi</span>
            </div>
            <div className= "navbar-center">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/hotels">Hotels</Link>
                    <Link to="/cabs">Cabs</Link>
                    <Link to="/about">About</Link>
                    <Link to="/mybookings">My bookings</Link>
                </div>
            </div>
          


            <div className = "auth-section">
                { user ? (
                    <div className = "user-icon">👤{user.name}</div>
                ) : (
                    <button onClick = {() => setShowLogin(true)}>Login/Signup</button>

                )}
            </div>
            

        </nav>
    );
}

export default Navbar;