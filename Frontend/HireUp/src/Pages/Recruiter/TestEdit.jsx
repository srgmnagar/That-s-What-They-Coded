import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TestEdit = () => {
    const { testId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tests/${testId}/questions/`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                const data = await response.json();

                if (response.ok) {
                    setQuestions(data.questions);
                } else {
                    setError(data.error || "Failed to fetch questions");
                }
            } catch (error) {
                setError("Error fetching questions");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [testId]);

    return (
        <div>
            <h2>Edit Test</h2>
            {loading ? (
                <p>Loading questions...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : questions.length > 0 ? (
                <ul>
                    {questions.map((q) => (
                        <li key={q.id}>{q.question_text}</li>
                    ))}
                </ul>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    );
};

export default TestEdit;

