


import { useState } from "react";

function AddCabForm ({onSubmit}) {
    const [formData, setFormData] = useState({name:"", type:""});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", type: ""});
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

            <button type = "submit">Submit</button>
        </form>
        </>
    );
}


export default AddCabForm;