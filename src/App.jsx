import "./styles/ToastMessage.css"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StoryList from "./pages/StoryList";
import CreateStory from "./pages/CreateStory";
import AdminPage from "./pages/AdminPage";


function App() {
    return (
        <Router>
  <ToastContainer 
    position="top-right" 
    autoClose={2000}  
    hideProgressBar
    closeOnClick
    pauseOnHover={false}
    draggable={false}
    newestOnTop
    limit={1} 
/>
            <Navbar /> {/* ✅ Navigacija visame projekte */}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/stories" element={<StoryList />} />
                <Route path="/create-story" element={<CreateStory />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}

export default App;