

import React from "react";

function LoginPopup({
    //object destructuring
    isSignup,
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleLogin,
    setIsSignup,
    setShowLogin
}) {
    return (
        
        <div className="login-popup">
                    <h3>{isSignup ? "Sign up" : "Login"}</h3>

                    {isSignup && (
                        <input 
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}


                    <input 
                        type="email" 
                        placeholder="Email"
                        value= {email} 
                        onChange={(e)=> setEmail(e.target.value)}
                        required />

                    <input 
                        type="password"     
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required />


                    { isSignup &&(
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    )}
                    

                    <button onClick={ ()=> setShowLogin(false)}>Close</button>
                    <button onClick={handleLogin}>{isSignup ? "Sign up" : "Login"}</button>

                    <p className="toggle-auth">
                        {isSignup ? "Already have an account?" : "Don't have an account"}{" "}
                        <span onClick={()=> setIsSignup(!isSignup)}>
                            {isSignup ? "Login" : "Sign Up"}
                        </span>
                    </p>
        </div>
    );
}

export default LoginPopup;