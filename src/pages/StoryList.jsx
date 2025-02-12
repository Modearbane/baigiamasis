import "../styles/StoryList.css"; 
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const StoryList = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [donation, setDonation] = useState({});
    const [donorName, setDonorName] = useState({});

    const fetchStories = () => {
        fetch("http://localhost:1337/stories")
            .then((response) => response.json())
            .then((data) => {
                setStories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Klaida gaunant istorijas:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleDonate = async (storyId) => {
        if (!donation[storyId] || !donorName[storyId]) {
            toast.warning("⚠️ Įveskite vardą ir aukojamą sumą!");
            return;
        }
    
        const response = await fetch(`http://localhost:1337/donate/${storyId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                donorName: donorName[storyId], 
                amount: parseFloat(donation[storyId]) 
            }),
        });
    
        if (response.ok) {
            toast.success("✅ Aukojimas sėkmingas!");
    
            setTimeout(() => {
                setDonation({ ...donation, [storyId]: "" });
                setDonorName({ ...donorName, [storyId]: "" });
                fetchStories();
            }, 2000);
        } else {
            toast.error("❌ Klaida aukojant.");
        }
    };

    return (
        <div className="story-container">
            <h2>📖 Istorijų sąrašas</h2>
            {loading ? (
                <p>Kraunama...</p>
            ) : (
                <div className="story-grid">
                    {stories
                        .filter(story => story.approved === 1) // **Tik patvirtintos istorijos**
                        .map((story) => {
                            const goalAmount = parseFloat(story.goalAmount) || 0;
                            const collectedAmount = parseFloat(story.collectedAmount) || 0;
                            const remainingAmount = Math.max(goalAmount - collectedAmount, 0);

                            return (
                                <div key={story.id} className="story">
                                    <h3>{story.title}</h3>
                                    <p>{story.description}</p>
                                    <p>🎯 Tikslas: {goalAmount.toFixed(2)} €</p>
                                    <p>💰 Surinkta: {collectedAmount.toFixed(2)} €</p>
                                    <p>📉 Liko surinkti: {remainingAmount.toFixed(2)} €</p>

                                    {story.image && <img src={`http://localhost:1337${story.image}`} alt="Istorijos nuotrauka" />}

                                    {remainingAmount > 0 ? (
                                       <div className="donate-form">
                                       <input 
                                           type="text" 
                                           placeholder="Jūsų vardas" 
                                           className="input-field"
                                           value={donorName[story.id] || ""} 
                                           onChange={(e) => setDonorName({ ...donorName, [story.id]: e.target.value })}
                                       />
                                       <input 
                                           type="text" 
                                           placeholder="Aukojama suma (€)" 
                                           className="input-field"
                                           value={donation[story.id] || ""} 
                                           onChange={(e) => setDonation({ ...donation, [story.id]: e.target.value.replace(/[^\d.,]/g, "") })}
                                       />
                                       <button className="submit-button" onClick={() => handleDonate(story.id)}>💰 Aukoti</button>
                                   </div>
                                   
                                    ) : (
                                        <p>✅ Ši istorija jau surinko reikiamą sumą!</p>
                                    )}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default StoryList;
