import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash, Save, X } from 'lucide-react';
import CandidateNav from '../../Components/CandidateNav';

function TestEdit() {
  const { testId } = useParams(); // Get the test ID from URL params
  const navigate = useNavigate();
  const api_link = "http://127.0.0.1:8000/";
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchTestQuestions();
  }, [testId]);

  const fetchTestQuestions = async () => {
    if (!testId) {
      setQuestions([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${api_link}question_list/${testId}/`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store auth token in localStorage
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch test questions');
      }
  
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to load test questions');
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    if (!testId) {
      setError('Test ID is missing');
      return;
    }

    try {
      // Save each question individually
      for (const question of questions) {
        if (question.id) {
          // Update existing question
          await fetch(`${api_link}question_detail/${testId}/${question.id}/`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              question_text: question.question,
              options: question.options,
              correct_answer: question.correctAnswer,
              test: testId
            }),
          });
        } else {
          // Create new question
          await fetch(`${api_link}question_list/${testId}/`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              question_text: question.question,
              options: question.options,
              correct_answer: question.correctAnswer,
              test: testId
            }),
          });
        }
      }
  
      setIsEditing(false);
      setError('');
      // Refresh questions to get any IDs for new questions
      fetchTestQuestions();
    } catch (err) {
      console.error("Update error:", err);
      setError('Failed to update test questions');
    }
  };
  
  const handleCancel = () => {
    fetchTestQuestions();
    setIsEditing(false);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setIsEditing(true);
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setIsEditing(true);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { 
      question: '', 
      options: ['', '', '', ''], 
      correctAnswer: '' 
    }]);
    setIsEditing(true);
  };

  const removeQuestion = async (index) => {
    const questionToRemove = questions[index];
    
    // If question has an ID, it exists in the database and needs to be deleted
    if (questionToRemove.id) {
      try {
        const response = await fetch(`${api_link}question_detail/${testId}/${questionToRemove.id}/`, {
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete question');
        }
      } catch (err) {
        console.error("Delete error:", err);
        setError('Failed to delete question');
        return;
      }
    }
    
    // Remove from local state
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-lg">Loading test questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 flex p-5 bg-gradient-to-r from-purple-600 to-indigo-600">
      <CandidateNav />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white w-[600px] shadow-xl rounded-2xl overflow-hidden p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">MCQ Test Questions</h1>
            <button 
              onClick={addQuestion} 
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Plus size={20} className="mr-2" /> Add Question
            </button>
          </div>
          
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>}

          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No questions found for this test. Click "Add Question" to create your first question.
            </div>
          ) : (
            questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-6 p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Question {qIndex + 1}</h3>
                  <button
                    onClick={() => removeQuestion(qIndex)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                  >
                    <Trash size={16} className="mr-1" /> Delete
                  </button>
                </div>
                <input
                  type="text"
                  value={q.question || ''}
                  onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg mb-2"
                  placeholder="Enter question"
                />
                <div className="ml-2">
                  {q.options && q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center mb-1">
                      <span className="mr-2 text-gray-500">{oIndex + 1}.</span>
                      <input
                        type="text"
                        value={option || ''}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correct Answer:
                  </label>
                  <input
                    type="text"
                    value={q.correctAnswer || ''}
                    onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter the correct answer"
                  />
                </div>
              </div>
            ))
          )}

          <div className="flex justify-end space-x-4 mt-4">
            {isEditing && (
              <button 
                onClick={handleCancel} 
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 flex items-center"
              >
                <X size={20} className="mr-2" /> Cancel
              </button>
            )}
            <button 
              onClick={handleSave} 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              disabled={!isEditing}
            >
              <Save size={20} className="mr-2" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestEdit;