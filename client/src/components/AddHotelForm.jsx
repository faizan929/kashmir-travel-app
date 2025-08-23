


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
    <div className = "max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit = {handleSubmit}>
            <input
                type = "text"
                name = "name"
                placeholder="Hotel name"
                value = {formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
             <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                
            />
            <input 
                type = "number"
                name = "price"
                placeholder = "Price"
                value = {formData.price}
                onChange = {handleChange}
                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
                type = "text"
                name = "description"
                placeholder = "Description"
                value = {formData.description}
                onChange = {handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
            type = "submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
                Submit
            </button>
        </form>
    </div>
    );
}


export default AddHotelForm