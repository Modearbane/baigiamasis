import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/AdminPage.css";

const AdminPage = () => {
    const [stories, setStories] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:1337/admin/stories", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => setStories(data))
            .catch((error) => console.error("❌ Klaida gaunant istorijas:", error));
    }, [token]);

    const approveStory = async (id) => {
        const response = await fetch(`http://localhost:1337/stories/approve/${id}`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
        });

        if (response.ok) {
            toast.success("✅ Istorija patvirtinta!", { autoClose: 2000 });

            setTimeout(() => {
                setStories(prevStories => prevStories.map(story =>
                    story.id === id ? { ...story, approved: 1 } : story
                ));
            }, 2000);
        } else {
            toast.error("❌ Klaida patvirtinant istoriją.", { autoClose: 2000 });
        }
    };

    const deleteStory = async (id) => {
        const response = await fetch(`http://localhost:1337/stories/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
            toast.success("🗑️ Istorija ištrinta!", { autoClose: 2000 });

            setTimeout(() => {
                setStories(prevStories => prevStories.filter(story => story.id !== id));
            }, 2000);
        } else {
            toast.error("❌ Klaida ištrinant istoriją.", { autoClose: 2000 });
        }
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">🔧 Administratoriaus valdymas</h2>
            <div className="story-list">
                {stories.length > 0 ? (
                    stories.map((story) => (
                        <div key={story.id} className="story-card">
                            <h3>{story.title}</h3>
                            <p className="story-description">{story.description}</p>
                            <p>Surinkta: {story.collectedAmount} / {story.goalAmount} €</p>

                            {story.approved ? (
                                story.image && <img src={`http://localhost:1337${story.image}`} alt="Istorijos nuotrauka" className="story-image" />
                            ) : (
                                <p className="waiting-text">📷 Nuotrauka matysis po patvirtinimo</p>
                            )}

                            <p className={story.approved ? "approved" : "pending"}>
                                {story.approved ? "✅ Patvirtinta" : "⏳ Laukia patvirtinimo"}
                            </p>

                            <div className="story-actions">
                                {!story.approved && (
                                    <button className="approve-button" onClick={() => approveStory(story.id)}>✅ Patvirtinti</button>
                                )}
                                <button className="delete-button" onClick={() => deleteStory(story.id)}>🗑️ Ištrinti</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-stories">❌ Nėra nep patvirtintų istorijų.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
