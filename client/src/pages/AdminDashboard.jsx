

import "./Admin.css"

import {useEffect, useState} from "react";

import AddCabForm from "../components/AddCabForm";
import AddHotelForm from "../components/AddHotelForm";



import { submitCab } from "../services/cabService";
import { submitHotel } from "../services/hotelService";



function AdminDashboard() {

    const [hotels, setHotels] = useState([]);
    const [cabs, setCabs] = useState([]);
    const [editHotel, setEditHotel] = useState(null);
    const [editCab, setEditCab] = useState(null);
    
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
            if(editHotel) {
                const res = await fetch(`http://localhost:5000/api/hotels/${editHotel._id}`,{
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data),
                });
                const updatedHotel = await res.json();
                setHotels((prev) => 
                prev.map((h) => (h._id === updatedHotel._id? updatedHotel : h))
            );
            setEditHotel(null);
            } else {
                const savedHotel = await submitHotel(data);
                setHotels((prev) => [...prev, savedHotel]);
            }
        }catch(err){
            console.error(err);
            alert("Error handling hotel");
        }
    };


    const handleCabSubmit = async (data) => {
        try {
            if (editCab){
            const res = await fetch(`http://localhost:5000/api/cabs/${editCab._id}`,{
                method: 'PUT',
                headers: {'Content-Type':"application/json"},
                body: JSON.stringify(data),
            });
            const updatedCab = await res.json();
            setCabs((prev) =>
            prev.map((c) => (c._id === updatedCab._id? updatedCab : c))
        );
        setEditCab(null);
            } else {
                const savedCab = await submitCab(data);
                setCabs((prev) => [...prev, savedCab]);
                setShowCabForm(false);
            }
            
        }catch(err){
            console.error(err);
            alert("Error handling cab")
        }
    };

        const handleDeleteHotel = async (id) => {
            try {
                await fetch (`http://localhost:5000/api/hotels/${id}`, {
                    method : 'DELETE'

                });
                setHotels((prev) => prev.filter((hotel) => hotel._id !== id));
            } catch(error) {
                console.error(error);
                alert("Error deleting the hotel");
            }
        }

        const handleDeleteCab = async (id) => {
            try {
                await fetch (`http://localhost:5000/api/cabs/${id}`, {
                    method : 'DELETE'

                });
                setCabs((prev) => prev.filter((cab) => cab._id !== id));
            } catch(error) {
                console.error(error);
                alert("Error deleting the cab");
            }
        }
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <h3>Hotels ({hotels.length})</h3>
            <button onClick ={() => setShowHotelForm(!showHotelForm)}>
                {showHotelForm?"Cancel":"Add Hotel"}
            </button>
            {showHotelForm && (
            <AddHotelForm 
                onSubmit = { (data) => handleHotelSubmit(data)} 
                initialData = {editHotel} 
                />
            )}
            <ul className = "hotel-list">
                 {hotels.map((hotel) => (
                    <li key = {hotel._id} className = "hotel-item">
                        <span className = "hotel-name">{hotel.name}</span>
                        <div className = "hotel-actions">
                            <button onClick = {() => {setEditHotel(hotel); setShowHotelForm(true); }}>Edit</button>
                            <button onClick = {() => handleDeleteHotel(hotel._id)}>Delete</button>
                        </div>
                        
                    </li>
                 ))}
            </ul>



            <h3>Cabs ({cabs.length})</h3>
            <button onClick = {()=>  setShowCabForm(!showCabForm)}>
                {showCabForm ? "Cancel" : "Add Cab"}
            </button>
            {showCabForm && (
                <AddCabForm 
                onSubmit = {(data) => handleCabSubmit(data)} 
                initialData = {editCab}
                />
            )}
            
            <ul className = "cab-list">
                {cabs.map((cab) => (
                    <li key = {cab._id} className = "cab-item">
                        <span class="cab-name">{cab.name}</span>
                        <div className = "cab-actions">
                             <button onClick = {() =>{ setEditCab(cab); setShowCabForm(true); }}>Edit</button>
                                <button onClick = {() => handleDeleteCab(cab._id)}>Delete</button>
                        </div>
                       
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default AdminDashboard;
 


