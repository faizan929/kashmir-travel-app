
import {useState} from "react";
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";




import Home from "./pages/Home"
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import Cabs from "./pages/Cabs";

function App(){

      const [showLogin, setShowLogin]=useState(false);
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

  return (
    <>
        <Navbar onLoginClick={()=> setShowLogin(true)} />
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
        
             <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/cabs" element={<Cabs />} />
              </Routes>
    
    </>
   
   
  );
}

export default App 