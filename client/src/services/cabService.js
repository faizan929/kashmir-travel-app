



export const submitCab = async (data) => {
    const res = await fetch("http://localhost:5000/api/cabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to add cab");
    return await res.json();
};
