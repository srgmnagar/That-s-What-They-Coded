import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [topic, setTopic] = useState("");
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState("medium");
    const [mcqs, setMcqs] = useState([]);
    const [error, setError] = useState("");

    const fetchMCQs = async () => {
        setError("");
        setMcqs([]);
        
        if (!topic) {
            setError("Please enter a topic.");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/base/generate-mcq/", {
                topic,
                num_questions: numQuestions,
                difficulty,
            });

            setMcqs(response.data.mcqs);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>MCQ Generator</h1>

            <div style={styles.form}>
                <label>Topic:</label>
                <input 
                    type="text" 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)} 
                    placeholder="Enter topic (e.g., Physics)" 
                    style={styles.input}
                />

                <label>Number of Questions:</label>
                <input 
                    type="number" 
                    value={numQuestions} 
                    onChange={(e) => setNumQuestions(e.target.value)} 
                    style={styles.input}
                    min="1"
                />

                <label>Difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={styles.input}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button onClick={fetchMCQs} style={styles.button}>Generate MCQs</button>

                {error && <p style={styles.error}>{error}</p>}
            </div>

            {mcqs.length > 0 && (
                <div style={styles.mcqContainer}>
                    <h2>Generated MCQs:</h2>
                    {mcqs.map((mcq, index) => (
                        <div key={index} style={styles.mcq}>
                            <p><strong>Q{index + 1}:</strong> {mcq.question}</p>
                            <ul>
                                {mcq.options.map((option, i) => (
                                    <li key={i}>{option}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" },
    title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
    form: { display: "flex", flexDirection: "column", maxWidth: "400px", margin: "auto", gap: "10px" },
    input: { padding: "8px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
    button: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" },
    error: { color: "red", marginTop: "10px" },
    mcqContainer: { marginTop: "20px", textAlign: "left", maxWidth: "600px", margin: "auto" },
    mcq: { background: "#f8f9fa", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ddd" },
};
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestCreation from "./TestCreation";
import TestEdit from "./TestEdit";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TestCreation />} />
                <Route path="/tests/:testId/edit" element={<TestEdit />} />
            </Routes>
        </Router>
    );
}

export default App;