import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/CreateStory.css";

const CreateStory = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("goalAmount", goalAmount);
        if (image) formData.append("image", image);

        const response = await fetch("http://localhost:1337/stories", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            toast.success("✅ Istorija sėkmingai sukurta! Laukia administratoriaus patvirtinimo", { autoClose: 2000 });
            setTitle("");
            setDescription("");
            setGoalAmount("");
            setImage(null);
        } else {
            toast.error("❌ Klaida kuriant istoriją!", { autoClose: 2000 });
        }
    };

    return (
        <div className="create-story-container">
            <div className="create-story-form">
                <h2>📖 Sukurti naują istoriją</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Istorijos pavadinimas"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input-field"
                    />
                    <textarea
                        placeholder="Istorijos aprašymas"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="textarea-field"
                    ></textarea>
                    <input
                        type="number"
                        placeholder="Norima surinkti suma (€)"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input type="file" onChange={handleFileChange} className="file-input" />
                    <button type="submit" className="submit-button">📤 Pateikti istoriją</button>
                </form>
            </div>
        </div>
    );
};

export default CreateStory;
