import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("❌ Slaptažodžiai nesutampa!", { autoClose: 2000 });
            return;
        }

        const response = await fetch("http://localhost:1337/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            toast.success("✅ Registracija sėkminga! Galite prisijungti.", { autoClose: 2000 });

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            toast.error("❌ Klaida registruojantis!", { autoClose: 2000 });
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>📝 Registracija</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Vartotojo vardas"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Slaptažodis"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Pakartokite slaptažodį"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="register-button">✅ Registruotis</button>
                </form>
                <Link to="/login" className="login-link">🔑 Jau turite paskyrą? Prisijunkite</Link>
            </div>
        </div>
    );
};

export default RegisterPage;