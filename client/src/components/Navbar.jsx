
import { Link } from "react-router-dom";

import "./Navbar.css";


function Navbar({onLoginClick}) {
    return ( 
        <nav className="navbar">
            <div className="navbar-left">
                <h2 className="logo">
                    <Link to="/" className="logo-link">SafarKashmir</Link>
                </h2>
                <span className="tagline">Assi ti Lassi</span>
            </div>
          
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/hotels">Hotels</Link>
                <Link to="/cabs">Cabs</Link>
                <Link to="/about">About</Link>

            
                <button className= "login-btn" onClick={onLoginClick}> Login/Signup</button>

            </div>

        </nav>
    );
}

export default Navbar;