


import { useState } from "react";

function AddCabForm ({onSubmit}) {
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
        <>

        <form onSubmit = {handleSubmit}>
            <input 
                type = "text"
                name = "name"
                placeholder = "Cab Name"
                value = {formData.name}
                onChange = {handleChange}
            />

             <input
                type="text"
                name="type"
                placeholder="Cab Type"
                value={formData.type}
                onChange={handleChange}
            />
            <input 
                type = "number"
                name = "pricePerDay"
                placeholder = "Price per day"
                value = {formData.pricePerDay}
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


export default AddCabForm;