
      
import {useState, useEffect} from "react";  

import { useNavigate } from "react-router-dom";

import AuthContext from "./AuthContext"

export function AuthProvider({children}){
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(null);
        const [redirectedPath, setRedirectedPath] = useState("/");
        const [showLogin, setShowLogin]=useState(false);
        const [email, setEmail]=useState("");
        const [password, setPassword]=useState("");
        const [name, setName]=useState("")
        const [confirmPassword, setConfirmPassword]=useState("")
        const [isSignup, setIsSignup]=useState(false);
        const navigate = useNavigate();

      useEffect(() => {
        
        
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
          setUser(JSON.parse(storedUser));
          }
          setLoading(false);
       
      }, []);
        
      

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

              if (redirectedPath){
                navigate(redirectedPath || "/");
                setRedirectedPath("/");
              }
              

            }catch(error){
              console.error(error);
              alert("Something went wrong. Try again.")
            }
        }
      
      }
     
    
    

  return (

        <AuthContext.Provider
            value={{
                    user,
                    setUser,
                    isSignup,
                    setIsSignup,
                    showLogin,
                    setShowLogin,
                    name,
                    setName,
                    email,
                    setEmail,
                    password,
                    setPassword,
                    confirmPassword,
                    setConfirmPassword,
                    handleLogin,
                    redirectedPath,
                    setRedirectedPath,
                    loading
                }}
        >
                {children}
                </AuthContext.Provider>
            );
        }


        