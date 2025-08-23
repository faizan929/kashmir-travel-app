
import { Link } from "react-router-dom";


function Navbar({setShowLogin,user,setUser}) {

    return ( 
    <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className = "flex justify-between items-center h-16">
                <div className = "flex items-center space-x-4">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-blue-600">
                            <Link to="/" className="hover:text-blue-800 transition duration-200">
                                KashmirTravel
                            </Link>
                        </h2>
                        <span className="text-xs text-gray-500">Assi ti Lassi</span>
                    </div>
                </div>

                <div className = "hidden md:flex space-x-8">
        
              
                    <Link 
                        to="/"
                        className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                    >   
                        Home
                    </Link>
                    <Link 
                        to="/hotels"
                         className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                        
                    >
                        Hotels
                    </Link>

                    <Link 
                        to="/cabs"
                         className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                    >
                        Cabs
                    </Link>

                    <Link 
                        to="/mybookings"
                        className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                    >
                        My bookings
                    </Link> 

                    {user?.isAdmin && (
                        <Link 
                            to = "/admin"
                             className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                            >
                            Admin
                        </Link>
                    )}
                        <Link 
                            to="/about"
                            className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                        >
                            About
                        </Link>
                    
                </div>
          
        
                <div className="flex items-center">
                    { user ? (
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">👤{user.name}</span>
                                <span className="text-gray-700 font-medium">{user.name}</span>
                            </div>

                            <button 
                                onClick = {() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    setUser(null);
                                    window.location.href = "/";
                                }}
                                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                ) : (
                    <button 
                        onClick = {() => setShowLogin(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                            Login/Signup
                    </button>
                )}
                </div>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;