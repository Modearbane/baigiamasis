import React from "react";
import "../styles/HomePage.css"; // ✅ Importuojame stilių failą

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="overlay"></div> {/* Tamsus sluoksnis ant fono */}
            <div className="content">
                <h1>🌟 Sveiki atvykę į mūsų aukojimo puslapį!</h1>
                <p>📖 Kurkite ir dalinkitės savo istorijomis su pasauliu!</p>
                <button onClick={() => window.location.href = "/stories"}>📜 Peržiūrėti istorijas</button>
            </div>
        </div>
    );
};

export default HomePage;