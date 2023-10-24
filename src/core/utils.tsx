import React, { useEffect } from 'react';

function VérifierAuthentification() {
    useEffect(() => {
        if (localStorage.getItem("IsLoggedIn") !== "true") {
            window.location.href = "http://localhost:3000/";
        }
    }, []); 

    return true;
}

export default VérifierAuthentification;