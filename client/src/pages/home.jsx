
// import { useNavigate } from  "react-router-dom"; 

import { useState } from "react";


function Home(){
    const [showLogin, setShowLogin]=useState(false);
    // const navigate=useNavigate();

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const [name, setName]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")

    const [isSignup, setIsSignup]=useState(false);



    
    
    function handleLogin(){
        if (isSignup){

            if(!name || !email || !password || !confirmPassword){
            alert("Please fill in all the fields.");
            return;
            }

            if(password!=confirmPassword){
                alert("Passwords do not match");
                return;
            }

            console.log("Signing up: ", {name, email, password});
            alert("Signup clicked!");
        }else{
            if(!email || !password){
                alert("Please fill in both the fields.");
                return;
            }
            console.log("Logging in:", {email, password});
            alert("Login clicked");
        }
    }




    return(
        <>

            <div className="heading">
                <h1 className="first-heading">KashmirSafar</h1>
                <p className="info">Explore beautiful places, book cabs and hotels, travel stress-free.</p>
            </div>


            <div className="explore">                
                <h2>Explore Kashmir</h2>
                <input type="text" placeholder="Search places, hotels, cabs..." />
                <div className="cards-section">
                    <div className="card">Pahalgam</div>
                    <div className="card">Gulmarg</div>
                    <div className="card">Doodhpatri</div>
                </div>
            </div>


            <button className="login-btn" onClick={()=>setShowLogin(true)}>Login/Sign up</button>


            {showLogin &&(
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
            )}


        </>
         
    );
}

export default Home;