
import {useEffect, useState} from 'react';

function Cabs(){

    const [cabs, setCabs] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/api/cabs")
        .then(res => res.json())
        .then(data => setCabs(data))
        .catch(err => {
            console.error(err);
            alert('Failed to fetch cabs.')
        });
    }, []);
    return (
        <div className="cab-page">
            <h2>Cabs in Kashmir</h2>
            <p>Find and book comfortable cabs for your travel.</p>


            <ul>
                {cabs.map((cab) => (
                    <li key={cab._id}>
                        <h3>{cab.name}</h3>
                        <p>Type: {cab.type}</p>
                        <p>Seats: {cab.seats}</p>
                        <p>₹{cab.pricePerDay}/day</p>
                        <p>{cab.description}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Cabs;