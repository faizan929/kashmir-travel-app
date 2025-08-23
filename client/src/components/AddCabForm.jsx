

import { useState } from "react";

function AddCabForm ({ onSubmit }) {
    const [formData, setFormData] = useState({name:"", type:"", pricePerDay:"", description:""});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", type: "", pricePerDay:"", description: ""});
    };


    return (
        
    <div className = "max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit = {handleSubmit} className = "space-y-4">
            <input 
                type = "text"
                name = "name"
                placeholder = "Cab Name"
                value = {formData.name}
                onChange = {handleChange}
                className = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

             <input
                type="text"
                name="type"
                placeholder="Cab Type"
                value={formData.type}
                onChange={handleChange}
                className = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
                type = "number"
                name = "pricePerDay"
                placeholder = "Price per day"
                value = {formData.pricePerDay}
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


export default AddCabForm;