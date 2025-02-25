function api(formData) {
    const apiUrl = import.meta.env.VITE_URL_SERVER;
    console.log (formData);
    return fetch(`${apiUrl}/newproject`, {
        body: JSON.stringify(formData),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
   
}





export default api