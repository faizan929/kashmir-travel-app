

import { useState } from "react";

function AddHotelForm({ onSubmit }) {
    const [ formData, setFormData ] = useState({ name: "", location: "", price:"", description:""});
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", location: "", price: "", description: ""});
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
            <input 
                type = "number"
                name = "price"
                placeholder = "Price"
                value = {formData.price}
                onChange = {handleChange}
            />
            <input 
                type = "text"
                name = "description"
                placeholder = "Description"
                value = {formData.description}
                onChange = {handleChange}
            />
            <button type = "submit">Submit</button>
        </form>
    </>
    );
}


export default AddHotelForm