

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";
import { useAuth } from "./context/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import Cabs from "./pages/Cabs";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";

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
        <div className="min-h-screen bg-gray-50">
            <Navbar setShowLogin={setShowLogin} user={user} setUser={setUser} />
            
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

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/hotels" element={<Hotels />} />
                    <Route path="/cabs" element={<Cabs />} />
                    <Route 
                        path="/mybookings" 
                        element={
                            <ProtectedRoute>
                                <MyBookings />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </main>
            
          
            <footer className="bg-white shadow-md mt-auto">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2024 KashmirTravel. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;