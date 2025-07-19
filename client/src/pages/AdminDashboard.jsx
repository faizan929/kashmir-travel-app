



import {useEffect, useState} from "react";

import AddCabForm from "../components/AddCabForm";
import AddHotelForm from "../components/AddHotelForm";



import { submitCab } from "../services/cabService";
import { submitHotel } from "../services/hotelService";



function AdminDashboard() {

    const [hotels, setHotels] = useState([]);
    const [cabs, setCabs] = useState([]);
    
    const [user, setUser] = useState(null);
    const [showHotelForm, setShowHotelForm] = useState(false);
    const [showCabForm, setShowCabForm] = useState(false);
    
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
    const handleHotelSubmit = async(data) => {
        try{ 
            const savedHotel = await submitHotel(data);
            setHotels((prev) => [...prev, savedHotel]);
            setShowHotelForm(false);
        }catch(err){
            console.error(err);
            alert("Error adding hotel");
        }
    };


    const handleCabSubmit = async (data) => {
        try {
            const savedCab = await submitCab(data);
            setCabs((prev) => [...prev, savedCab]);
            setShowCabForm(false);
        }catch(err){
            console.error(err);
            alert("Error adding cab")
        }
    }
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Hotels ({hotels.length})</h3>
            <button onClick ={() => setShowHotelForm(!showHotelForm)}>
                {showHotelForm?"Cancel":"Add Hotel"}
            </button>
            {showHotelForm && <AddHotelForm onSubmit = { (data) => handleHotelSubmit(data)} />}
            <ul>
                 {hotels.map((hotel) => (
                    <li key = {hotel._id}>{hotel.name}</li>
                 ))}
            </ul>



            <h3>Cabs ({cabs.length})</h3>
            <button onClick = {()=>  setShowCabForm(!showCabForm)}>
                {showCabForm ? "Cancel" : "Add Cab"}
            </button>
            {showCabForm && <AddCabForm onSubmit = {(data) => handleCabSubmit(data)} />}
            
            <ul>
                {cabs.map((cab) => (
                    <li key = {cab._id}>{cab.name}</li>
                ))}
            </ul>
        </div>
    )

}

export default AdminDashboard;
 


