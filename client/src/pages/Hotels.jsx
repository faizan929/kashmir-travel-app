


import {useEffect, useState} from 'react';

function Hotels() {

    const[hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/hotels")
            .then(res => res.json()) 
            .then(data => setHotels(data))
            .catch(err => {
                console.error(err);
                alert("Failed to fetch hotels");
        });
    }, []);
    return( 
        <div className="hotel-page">
            <h2>Available Hotels</h2>
            <ul>
                {hotels.map((hotel)=>(
                    <li key = {hotel._id}>
                        <h3>{hotel.name}</h3>
                        <p>{hotel.location}</p>
                        <p>₹{hotel.price}</p>
                        <p>⭐{hotel.rating}</p>
                    </li>
                ))}
            </ul>
            {/* <p>Book the best stays at top-rated hotels in Kashmir.</p> */}
        </div>
    );
}

export default Hotels;
