

import { useState } from "react";

function AddHotelForm({ onSubmit }) {
    const [ formData, setFormData ] = useState({ name: "", location: ""});
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", location: ""});
    };

    return (
    <>
        <form onSubmit = {handleSubmit}>
            <input
                type = "text"
                name = "name"
                placeholder="Hotel name"
                value = {formData.name}
                onChange={handleChange}
            />
             <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
            />

            <button type = "submit">Submit</button>
        </form>
    </>
    );
}


export default AddHotelForm