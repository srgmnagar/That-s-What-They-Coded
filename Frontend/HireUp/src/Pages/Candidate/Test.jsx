
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Test() {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([
//     {
//       question: "What is the capital of France?",
//       options: ["Berlin", "Madrid", "Paris", "Rome"],
//       correctAnswer: "Paris",
//       selectedAnswer: null,
//     },
//     {
//       question: "What is 2 + 2?",
//       options: ["3", "4", "5", "6"],
//       correctAnswer: "4",
//       selectedAnswer: null,
//     },
//     {
//       question: "Which planet is known as the Red Planet?",
//       options: ["Earth", "Mars", "Jupiter", "Venus"],
//       correctAnswer: "Mars",
//       selectedAnswer: null,
//     },
//   ]);

//   const [timeRemaining, setTimeRemaining] = useState(120);
//   const [testCompleted, setTestCompleted] = useState(false);
//   const tabSwitchCount = useRef(0);

//   useEffect(() => {
//     if (timeRemaining > 0 && !testCompleted) {
//       const timer = setInterval(() => {
//         setTimeRemaining((prevTime) => prevTime - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     } else if (timeRemaining === 0 && !testCompleted) {
//       setTestCompleted(true);
//       alert("Time's up!");
//       navigate("/candidate/dashboard");
//     }
//   }, [timeRemaining, testCompleted, navigate]);

//   useEffect(() => {
//     const disableRightClick = (e) => e.preventDefault();
//     document.addEventListener("contextmenu", disableRightClick);

//     return () => {
//       document.removeEventListener("contextmenu", disableRightClick);
//     };
//   }, []);

//   const handleAnswerSelection = (questionIndex, answer) => {
//     const updatedQuestions = questions.map((q, index) => {
//       if (index === questionIndex) {
//         return { ...q, selectedAnswer: answer };
//       }
//       return q;
//     });
//     setQuestions(updatedQuestions);
//   };

//   const useTabActive = () => {
//     useEffect(() => {
//       const handleVisibilityChange = () => {
//         if (document.hidden) {
//           tabSwitchCount.current++;
//           if (tabSwitchCount.current >= 2) {
//             setTestCompleted(true);
//             alert("Test ended due to excessive tab switching.");
//             navigate("/candidate/dashboard");
//             return;
//           }
//           alert(`Tab change detected. You have ${2 - tabSwitchCount.current} attempts left.`);
//           window.focus();
//         }
//       };

//       document.addEventListener('visibilitychange', handleVisibilityChange);

//       return () => {
//         document.removeEventListener('visibilitychange', handleVisibilityChange);
//       };
//     }, []);
//   };

//   useTabActive();

//   const preventCopyPaste = (e) => {
//     e.preventDefault();
//     alert("Copying and pasting is disabled.");
//     return false;
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   const calculateScore = () => {
//     let score = 0;
//     questions.forEach((q) => {
//       if (q.selectedAnswer === q.correctAnswer) {
//         score++;
//       }
//     });
//     return score;
//   };

//   const handleSubmit = () => {
//     setTestCompleted(true);
//     alert(`Test completed! Your score is: ${calculateScore()} / ${questions.length}`);
//     navigate("/candidate/dashboard");
//   };

//   return (
//     <div className="min-h-screen p-6 px-10 no-select font-Sora" style={{
//         background:
//           'linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)',
//       }}>
//       <style>
//         {`
//           .no-select {
//             user-select: none;
//             -webkit-user-select: none;
//             -moz-user-select: none;
//             -ms-user-select: none;
//           }
//           .question-card {
//             border-radius: 8px;
//             padding: 16px;
//             margin-bottom: 16px;
//           }
//           .option-label {
//             display: flex;
//             align-items: center;
//             padding: 8px 16px;
//             border-radius: 4px;
//             margin-bottom: 4px;
//             cursor: pointer;
//           }
//           .submit-button {
//             color: white;
//             padding: 10px 20px;
//             border: none;
//             border-radius: 5px;
//             cursor: pointer;
//           }
//         `}
//       </style>
//       <h1 className="text-5xl font-bold mb-4 font-Exo text-white">Test</h1>
//       <div className="mb-4 text-2xl font-bold text-white">Time Remaining: {formatTime(timeRemaining)}</div>

//       {questions.map((question, index) => (
//         <div key={index} className="question-card bg-[#ffffff32]">
//           <p className="font-semibold">{question.question}</p>
//           <ul className="list-none">
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex} className="my-2">
//                 <label className="option-label bg-purple-950 hover:bg-purple-900 transition-colors text-white">
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option}
//                     checked={question.selectedAnswer === option}
//                     onChange={() => handleAnswerSelection(index, option)}
//                     disabled={testCompleted}
//                     onPaste={preventCopyPaste}
//                     onCopy={preventCopyPaste}
//                   />
//                   <span className="ml-2" onPaste={preventCopyPaste} onCopy={preventCopyPaste}>
//                     {option}
//                   </span>
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}

//       {!testCompleted && (
//         <button className="submit-button bg-violet-950 hover:bg-violet-950 hover:scale-105 duration-200 transition-all" onClick={handleSubmit}>
//           Submit Test
//         </button>
//       )}
//     </div>
//   );
// }

// export default Test;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Test() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [testCompleted, setTestCompleted] = useState(false);
  const tabSwitchCount = useRef(0);

  useEffect(() => {
    // Fetch MCQs from API when the component mounts
    const fetchQuestions = async () => {
      try {
        const authTokens = localStorage.getItem("authTokens");
console.log(authTokens); // Log the value of authTokens
const accessToken = JSON.parse(authTokens).access;
console.log(accessToken); // Log the value of accessToken
        if (!accessToken) {
          throw new Error("No access token found");
        }
      
        const response = await fetch("http://127.0.0.1:8000/base/generate_mcq/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // Make sure to pass the access token correctly
          },
          body: JSON.stringify({
            'topic': "Biology", // Corrected spelling for "physics"
            'num_questions': 4,
            'difficulty': "hard",
          }),
        });
      
        const data = await response.json();
        console.log("Response data:", data);
      
        if (response.ok) {
          // Handle success
          setQuestions(data.mcqs)
          console.log("MCQs generated successfully");
        } else {
          // Handle error
          console.error("Failed to generate MCQs:", data);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
      
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeRemaining > 0 && !testCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !testCompleted) {
      setTestCompleted(true);
      alert("Time's up!");
      navigate("/candidate/dashboard");
    }
  }, [timeRemaining, testCompleted, navigate]);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const handleAnswerSelection = (questionIndex, answer) => {
    const updatedQuestions = questions.map((q, index) =>
      index === questionIndex ? { ...q, selectedAnswer: answer } : q
    );
    setQuestions(updatedQuestions);
  };

  const useTabActive = () => {
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          tabSwitchCount.current++;
          if (tabSwitchCount.current >= 2) {
            setTestCompleted(true);
            alert("Test ended due to excessive tab switching.");
            navigate("/candidate/dashboard");
            return;
          }
          alert(`Tab change detected. You have ${2 - tabSwitchCount.current} attempts left.`);
          window.focus();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, []);
  };

  useTabActive();

  const preventCopyPaste = (e) => {
    e.preventDefault();
    alert("Copying and pasting is disabled.");
    return false;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;
  };

  const calculateScore = () => {
    return questions.filter((q) => q.selectedAnswer === q.correctAnswer).length;
  };

  const handleSubmit = () => {
    setTestCompleted(true);
    alert(`Test completed! Your score is: ${calculateScore()} / ${questions.length}`);
    navigate("/candidate/profile");
  };

  return (
    <div className="min-h-screen p-6 px-10 font-Sora" style={{ background: "linear-gradient(115deg, rgba(38, 0, 74, 0.73) 2.22%, rgba(105, 36, 171, 0.59) 103.12%)" }}>
      <h1 className="text-5xl font-bold mb-4 text-white">Test</h1>
      <div className="mb-4 text-2xl font-bold text-white">Time Remaining: {formatTime(timeRemaining)}</div>

      {questions.length === 0 ? (
        <p className="text-white text-xl">Loading questions...</p>
      ) : (
        questions.map((question, index) => (
          <div key={index} className="bg-[#ffffff32] p-4 rounded-md mb-4">
            <p className="font-semibold text-white">{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="my-2">
                  <label className="flex items-center p-2 rounded-md bg-purple-950 hover:bg-purple-900 transition-colors text-white cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={question.selectedAnswer === option}
                      onChange={() => handleAnswerSelection(index, option)}
                      disabled={testCompleted}
                      onPaste={preventCopyPaste}
                      onCopy={preventCopyPaste}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {!testCompleted && questions.length > 0 && (
        <button className="bg-violet-950 text-white px-6 py-3 rounded-md hover:scale-105 transition-all" onClick={handleSubmit}>
          Submit Test
        </button>
      )}
    </div>
  );
}

export default Test;
