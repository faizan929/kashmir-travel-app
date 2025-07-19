
import {useState} from "react";
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";





import Home from "./pages/Home"
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import Cabs from "./pages/Cabs";
import MyBookings from "./pages/MyBookings"
import AdminDashboard from "./pages/AdminDashboard"

function App(){

      const [showLogin, setShowLogin]=useState(false);
      const [email, setEmail]=useState("");
      const [password, setPassword]=useState("");
      const [name, setName]=useState("")
      const [confirmPassword, setConfirmPassword]=useState("")
      const [isSignup, setIsSignup]=useState(false);
      const [user, setUser] = useState(() =>{
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      });
     
    async function handleLogin(){
        if (isSignup){

            if(!name || !email || !password || !confirmPassword){
            alert("Please fill in all the fields.");
            return;
            }

            if(password != confirmPassword){
                alert("Passwords do not match");
                return;
            }
            try {
              const res = await fetch("http://localhost:5000/api/auth/register", {
                method : "POST",
                headers :   { "Content-type" : "application/json"},
                body : JSON.stringify({name, email, password }),
              });

              const data =await res.json();
              if (!res.ok){
                alert(data.message || "Registration failed.");
                return;
              }

              alert("Registration successful. Please log in.");
              setIsSignup(false);
            } catch(error) {
              console.error(error)
              alert("Something went wrong. Try again.")
            } 
        }else{
            if(!email || !password){
                alert("Please fill in both the fields.");
                return;
            }
            try {
              const res = await fetch ("http://localhost:5000/api/auth/login", {
                method : "POST", 
                headers : { "Content-type": "application/json" },
                body: JSON.stringify({ email, password }),
              });

              const data = await res.json()

              if (!res.ok) {
                alert(data.message || "Login Failed");
                return;
              }


              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user))
              setUser(data.user);


              alert("Login successful.");
              setShowLogin(false);

            }catch(error){
              console.error(error);
              alert("Something went wrong. Try again.")
            }
        }
    }

  return (
    <>
        <Navbar setShowLogin={setShowLogin} user ={user} setUser = {setUser}/>
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
                  <Route path ="/" element={<Home />} />
                  <Route path ="/about" element={<About />} />
                  <Route path ="/hotels" element={<Hotels />} />
                  <Route path ="/cabs" element={<Cabs />} />
                  <Route path ="/mybookings" element={<MyBookings/>} />
                  <Route path ="/admin" element={<AdminDashboard/>} />
              </Routes>
    
    </>
   
   
  );
}

export default App 