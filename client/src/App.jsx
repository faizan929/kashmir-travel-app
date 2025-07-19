

import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";

import { useAuth } from "./context/useAuth"
import ProtectedRoute from "./components/ProtectedRoute";





import Home from "./pages/Home"
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import Cabs from "./pages/Cabs";
import MyBookings from "./pages/MyBookings"
import AdminDashboard from "./pages/AdminDashboard"


function App() {

  const {
    user,
    setUser,
    showLogin,
    setShowLogin,
    isSignup,
    setIsSignup,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleLogin
  } = useAuth();
return (
  <>
  <Navbar setShowLogin = {setShowLogin} user = {user} setUser = {setUser} />
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
    <Route 
        path="/mybookings" 
        element= {
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
    
    </>
   
   
  );
}

export default App 