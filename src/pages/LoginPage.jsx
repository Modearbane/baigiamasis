import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:1337/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(`✅ Sveiki sugrįžę, ${data.username}!`, { autoClose: 2000 });

            setTimeout(() => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false");
                window.location.href = "/";
            }, 2000);
        } else {
            toast.error("❌ Neteisingas vartotojo vardas arba slaptažodis!", { autoClose: 2000 });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>🔐 Prisijungimas</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Vartotojo vardas" 
                        className="input-field"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Slaptažodis" 
                        className="input-field"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">🔓 Prisijungti</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;