



import {useEffect, useState} from "react";



function AdminDashboard() {

    const [hotels, setHotels] = useState([]);
    const [cabs, setCabs] = useState([]);
    
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);
    useEffect (() =>{
        if(!user?.isAdmin) return ;

        const fetchData = async() => {
        try{
            const [hotelRes, cabRes] = await Promise.all([
                fetch("http://localhost:5000/api/hotels"),
                fetch("http://localhost:5000/api/cabs")
            ]);

            const hotelData = await hotelRes.json();
            const cabData = await cabRes.json();


            setHotels(hotelData);
            setCabs(cabData);
        } catch(error){
            console.error("Failed to fetch admin data:", error)
        }
       
    };
    fetchData();

}, [user]);  //run this only when the component mounts

        if (user == null ) return <p>Access Denied.</p>
        if (!user?.isAdmin) return <p>Access Denied.</p>


    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Hotels ({hotels.length})</h3>
            <ul>
                 {hotels.map((hotel) => (
                    <li key = {hotel._id}>{hotel.name}</li>
                 ))}
            </ul>



            <h3>Cabs ({cabs.length})</h3>
            <ul>
                {cabs.map((cab) => (
                    <li key = {cab._id}>{cab.name}</li>
                ))}
            </ul>
        </div>
    )

}

export default AdminDashboard;
 


