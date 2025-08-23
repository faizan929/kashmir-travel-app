

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
        
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className = "bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4" >
                <div className = "flex justify-between items-center mb-4">
                    <h3 className = "text-xl font-semibold text-gray-800">
                        {isSignup ? "Sign up" : "Login"}
                    </h3>
                    <button 
                        onClick={()=> setShowLogin(false)}
                        className = "text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ×
                    </button>
                </div>
                
                <div className = "space-y-4">
                    {isSignup && (
                        <input 
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    )}


                    <input 
                        type="email" 
                        placeholder="Email"
                        value= {email} 
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />


                    <input 
                        type="password"     
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />


                    { isSignup &&(
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    )}
                    

              
                    <button 
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                        >
                            {isSignup ? "Sign up" : "Login"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        {isSignup ? "Already have an account?" : "Don't have an account"}{" "}
                        <span 
                            onClick={()=> setIsSignup(!isSignup)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                        >
                            {isSignup ? "Login" : "Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPopup;