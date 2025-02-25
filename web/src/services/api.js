function api(formData) {
    console.log (formData);
    return fetch("https://project-promo-b-module-4-team-3.onrender.com/newproject", {
        body: JSON.stringify(formData),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
   
}





export default api