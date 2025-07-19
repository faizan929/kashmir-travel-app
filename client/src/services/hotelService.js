


export const submitHotel = async (data) => {
            
                const res = await fetch("http://localhost:5000/api/hotels", {
                    method: "POST", 
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(data),
                });
                if(!res.ok) throw new Error("Failed to add hotel");
                return await res.json();
        };