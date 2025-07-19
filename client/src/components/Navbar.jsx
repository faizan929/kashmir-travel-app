
import { Link } from "react-router-dom";
// import {useEffect, useState} from "react";

import "./Navbar.css";


function Navbar({setShowLogin,user,setUser}) {


    return ( 
        <nav className="navbar">
            <div className="navbar-left">
                <h2 className="logo">
                    <Link to="/" className="logo-link">TravelApp</Link>
                </h2>
                <span className="tagline">Assi ti Lassi</span>
            </div>
            <div className= "navbar-center">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/hotels">Hotels</Link>
                    <Link to="/cabs">Cabs</Link>
                    <Link to="/mybookings">My bookings</Link> 
                    {user?.isAdmin && <Link to = "/admin">Admin</Link>}
                    <Link to="/about">About</Link>
                    
                </div>
            </div>
          


            <div className = "auth-section">
                { user ? (
                    <div className = "user-info">
                        <span className = "user-icon">👤{user.name}</span>
                        <button className = "logout-button"
                            onClick = {() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                setUser(null);
                                window.location.href = "/";
                            }}
                        >Logout</button>
                    </div>
                ) : (
                    <button onClick = {() => setShowLogin(true)}>Login/Signup</button>

                )}
            </div>
            

        </nav>
    );
}

export default Navbar;