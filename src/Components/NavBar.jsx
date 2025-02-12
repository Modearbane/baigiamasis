import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Navbar.css";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedIsAdmin = localStorage.getItem("isAdmin");

        if (storedUsername) {
            setUsername(storedUsername);
            setIsAdmin(storedIsAdmin === "true");
        }
    }, []);

    const handleLogout = () => {
        toast.info("👋 Atsijungta! Iki greito!", { autoClose: 2000 });

        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("isAdmin");

            navigate("/login");
            window.location.reload();
        }, 2000);
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">🏠 Pagrindinis</Link> 
                <Link to="/stories">📖 Istorijos</Link> 
                <Link to="/create-story">➕ Pridėti istoriją</Link>
                {isAdmin && <Link to="/admin">🔧 Admin</Link>}
            </div>

            <div className="nav-right">
                {username ? (
                    <>
                        <span className="username">🧑‍🦳{username}</span>
                        <button onClick={handleLogout} className="logout-button">🚪 Atsijungti</button>
                    </>
                ) : (
                    <>
                        <Link to="/register">📝 Registracija</Link>
                        <Link to="/login">🔑 Prisijungti</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
