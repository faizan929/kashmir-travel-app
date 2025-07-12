
// import { useNavigate } from  "react-router-dom"; 

import { useState } from "react";
import LoginPopup from "../components/LoginPopup";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";
import { Link } from "react-router-dom";


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
                <h1 className="first-heading">Asi ti Lassi</h1>
              
                <p className="info">Explore beautiful places, book cabs and hotels, travel stress-free.</p>
            </div>


            <div className="explore">                
                <h2>Explore Kashmir</h2>
                <SearchBar />
                < CardList />



            {showLogin && (
                  <LoginPopup
                        isSignup={isSignup}
                        name={name}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleLogin={handleLogin}
                        setIsSignup={setIsSignup}
                        setShowLogin={setShowLogin}
                />
                )}

            
            
            </div>


            <Link to="/about">
                <button className="about">Go to About Page</button>
            </Link>


            <button className="login-btn" onClick={()=>setShowLogin(true)}>Login/Sign up</button>


        </>
         
    );
}

export default Home;